import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Spinner } from "react-bootstrap";
import { Context } from "..";
import { fetchBasket, removeDevice } from "../http/BasketAPI";
import { fetchDevices } from "../http/deviceAPI";

function Basket() {
  const { device, basket } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchDevices().then((data) => {
      device.setDevices(data.rows.slice());
      console.log(device);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchBasket().then((data) => {
        basket.setDevices(data);
        console.log(basket);
        let total = 0;
        data.forEach((basketDevice) => {
          const d = device.devices.find(
            (device) => device.id === basketDevice.deviceId,
          );
          total += d.price * basketDevice.count;
        });
        setTotalPrice(total);
        console.log(totalPrice);
      });
    }
  }, [loading]);

  const basketDevices = basket.devices.map((basketDevice) => {
    const d = device.devices.find(
      (device) => device.id === basketDevice.deviceId,
    );
    return { ...d, count: basketDevice.count };
  });

  const remove = async (id) => {
    const res = await removeDevice(id);
    if (res === 200) {
      basket.setDevices(basket.devices.filter((d) => d.id !== id));
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Наименование</th>
                <th>Цена</th>
                <th>Количество</th>
                <th>Сумма</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {basketDevices.map((device) => (
                <tr key={device.id}>
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td>{device.price}</td>
                  <td>{device.count}</td>

                  <td>{device.price * device.count}</td>
                  <td>
                    <Button
                      onClick={(event) => {
                        event.stopPropagation();
                        remove(device.id);
                      }}
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4}>
          <h4>Итоговая сумма:</h4>
          <h5>{totalPrice}</h5>
          <Button variant="primary">Оформить заказ</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Basket;
