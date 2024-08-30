import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Row } from "react-bootstrap";
import DeviceItem from "../DeviceItem/DeviceItem";
import { Context } from "../..";
import { addDevice, addDeviceReq } from "../../API/BasketAPI";

const DeviceList = observer(() => {
  const { device } = useContext(Context);

  const [filteredDevices, setFilteredDevices] = useState([]);

  const removeDevice = (id) => {
    device.setDevices(device.devices.filter((d) => d.id !== id));
  };

  
  const filtered = useMemo(() => {
    return device.devices.filter((deviceItem) =>
      !device.searchQuery ||
      deviceItem.name.toLowerCase().includes(device.searchQuery.toLowerCase())
    );
  }, [device.searchQuery, device.devices]);

  useEffect(() => {
    const sortedDevices = [...filtered];
    if (device.sortType === "price") {
      sortedDevices.sort((a, b) =>
        device.priceSortDirection === "asc" ? a.price - b.price : b.price - a.price
      );
    } else if (device.sortType === "rating") {
      sortedDevices.sort((a, b) =>
        device.ratingSortDirection === "asc" ? a.rating - b.rating : b.rating - a.rating
      );
    }
    setFilteredDevices(sortedDevices);
  }, [device.searchQuery, device.devices, device.sortType, device.priceSortDirection, device.ratingSortDirection]);

  return (
    <Row key={device._devices.version} className="d-flex mt-3 flex-wrap">
      {filteredDevices.map((deviceItem) => (
        <DeviceItem
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={deviceItem.id}
          device={deviceItem}
          onRemove={removeDevice}
        />
      ))}
    </Row>
  );
});

export default DeviceList;
