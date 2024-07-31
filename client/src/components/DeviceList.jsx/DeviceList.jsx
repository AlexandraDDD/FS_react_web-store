import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import DeviceItem from "../DeviceItem/DeviceItem";
import { Context } from "../..";
import { addDevice } from "../../http/BasketAPI";

const DeviceList = observer(() => {
  const { device } = useContext(Context);
  const removeDevice = (id) => {
    device.setDevices(device.devices.filter((d) => d.id !== id));
  };
  const addToBasket = async (id) => {
    const res = await addDevice({ deviceId: id, count: 1 });
    if (res === 200) {
      console.log("suc");
    }
  };
  return (
    <Row key={device._devices.version} className="d-flex  mt-5 flex-wrap">
      {device.devices.map((device) => (
        <DeviceItem
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={device.id}
          addToBasket={addToBasket}
          device={device}
          onRemove={removeDevice}
        />
      ))}
    </Row>
  );
});

export default DeviceList;
