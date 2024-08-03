import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DeviceList from "../components/DeviceList.jsx/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Pages } from "../components/Pages";
import { Filterbar } from "../components/FilterBar";
import { Brandbar } from "../components/Brandbar";
import { TypeBar } from "../components/Typebar";
import CreateDevice from "../components/modals/CreateDevice";
import { action } from "mobx";

const Shop = observer(() => {
  const { device, modals, types, brands } = useContext(Context);

  useEffect(() => {
    if (types.types.length === 0)
      types.fetchTypes();
    if (brands.brands.length === 0)
      brands.fetchBrands();
  }, []);

  useEffect(() => {
    action(() => {
      device.fetchDevices();
    })();
  }, [device.page, device.selectedType, device.selectedBrand, device.limit]);

  return (
    <Container>
      <Row className="mt-5">
        <Col md={3}>
          <TypeBar />
          <Filterbar className="mt-5" />
        </Col>
        <Col md={9}>
          <Brandbar className="mt-5 " />
          <DeviceList className="" />
          <Pages />
        </Col>
      </Row>
      <CreateDevice
        purpose="edit"
        show={modals.deviceModalVisible}
        onHide={() => modals.setDeviceModalVisible(false)}
      ></CreateDevice>
    </Container>
  );
});

export default Shop;
