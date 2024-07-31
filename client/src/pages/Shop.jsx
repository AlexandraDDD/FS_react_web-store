import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DeviceList from "../components/DeviceList.jsx/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Pages } from "../components/Pages";
import { Filterbar } from "../components/FilterBar";
import { Brandbar } from "../components/Brandbar";
import { TypeBar } from "../components/Typebar";
import { fetchTypes } from "../http/TypesAPI";
import { fetchBrands } from "../http/BrandAPI";
import { fetchDevices } from "../http/deviceAPI";
import CreateDevice from "../components/modals/CreateDevice";

const Shop = observer(() => {
  const { device, modals } = useContext(Context);
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    /*  fetchDevices(null, null, 3, 1).then(data => {
      device.setDevices(data.rows.slice())

      device.setTotalCount(data.count)
    }) */
  }, [device]);

  useEffect(() => {
    let typeId = device.selectedType.id || null;
    let brandId = device.selectedBrand.id || null;
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.limit,
      device.page,
    ).then((data) => {
      device.setDevices(data.rows.slice());
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand, device.limit]);

  return (
    <Container>
      <Row className="mt-5">
        <Col md={3}>
          <TypeBar />
          <Filterbar className="mt-5" />
        </Col>
        <Col md={9}>
          <Brandbar className="mt-5 mb-5" />
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
