import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Row } from "react-bootstrap";
import DeviceItem from "../DeviceItem/DeviceItem";
import { Context } from "../..";
import { addDevice } from "../../API/BasketAPI";

const DeviceList = observer(() => {
  const { device } = useContext(Context);

  const [filteredDevices, setFilteredDevices] = useState([]);

  const removeDevice = (id) => {
    device.setDevices(device.devices.filter((d) => d.id !== id));
  };

  const addToBasket = async (id) => {
    const res = await addDevice({ deviceId: id, count: 1 });
    if (res === 200) {
      console.log("suc");
    }
  };
  const filtered = useMemo(() => {
    return device.devices.filter((deviceItem) =>
      !device.searchQuery ||
      deviceItem.name.toLowerCase().includes(device.searchQuery.toLowerCase())
    );
  }, [device.searchQuery, device.devices]);

  useEffect(() => {
    setFilteredDevices(filtered);
  }, [device.searchQuery, device.devices]);



  return (
    <Row key={device._devices.version} className="d-flex mt-3 flex-wrap">
      {filteredDevices.map((deviceItem) => (
        <DeviceItem
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={deviceItem.id}
          addToBasket={addToBasket}
          device={deviceItem}
          onRemove={removeDevice}
        />
      ))}
    </Row>
  );
});

export default DeviceList;
