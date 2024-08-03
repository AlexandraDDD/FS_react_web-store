import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../API/deviceAPI";
import { FaStar } from "react-icons/fa";

function DevicePage() {
  const [device, setDevice] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOneDevice(id);
        setDevice(data);
      } catch (error) {
        console.error("Error fetching device:", error);
      }
    };

    fetchData();
  }, [id]);


  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Image
            style={{ width: 300, height: 300 }}
            src={process.env.REACT_APP_API_URL + device.img}
          ></Image>
        </Col>
        <Col md={4}>
          <Row>
            <h3 style={{ margin: 0, marginRight: 5 }}>{device.name}</h3>
            <div className="d-flex pl-3 pr-3 align-items-center">
              <h2 style={{ margin: 0, marginRight: 5 }}>{device.rating}</h2>
              <FaStar style={{ fontSize: '2rem', color: 'gold' }} />
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card className="d-flex p-3  align-items-center flex-column justify-content-around">
            {(!device.price) ?
              <Spinner></Spinner> :
              <h3> {device.price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</h3>
            }

            <Button className="mb-2">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-2">
        <h4 className="p-0">Характеристики</h4>
        {device.info ? (
          device.info.map((info) => (
            <Row
              key={info.id}
              className="mb-2 p-1 d-flex justify-content-between border-bottom"
            >
              <Col md={6}>
                <strong>{info.title}:</strong>
              </Col>
              <Col md={6}>{info.description}</Col>
            </Row>
          ))
        ) : (
          <p>Характеристики не найдены</p>
        )}
      </Row>
    </Container>
  );
}

export default DevicePage;
