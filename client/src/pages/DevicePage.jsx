import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Image, Row, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../API/deviceAPI";

import { FaStar as FaStarSolid } from "react-icons/fa";
import { FaRegStar as FaStarRegular } from "react-icons/fa";

import { Context } from "..";
import Rating from 'react-rating';
import { createRatingReq } from "../API/RatingAPI";



function DevicePage() {
  const { basket } = useContext(Context)
  const [device, setDevice] = useState({});
  const [currentRating, setCurrentRating] = useState(device.rating);
  const [showToast, setShowToast] = useState(false);

  const { id } = useParams();
  // костыли на костях
  const fetchData = async () => {
    try {
      const data = await fetchOneDevice(id);
      setDevice(data);
      setCurrentRating(data.rating);
    } catch (error) {
      console.error("Error fetching device:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRating = (rate) => {
    createRatingReq(device.id, rate)
      .then((res) => {
        if (res.status === 409) {
          setShowToast(true); // Показываем toast-уведомление
        } else {
          fetchData();
        }
      })
      .catch((error) => {
        console.error("Error creating rating:", error);
      });
  };
  

  
  return (
    <Container className="mt-5">
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide style={{backgroundColor: ' #ffc107'}}>
          <Toast.Header>
            <strong className="me-auto">Вы уже поставили оценку</strong>
          </Toast.Header>
          <Toast.Body>На этом аккаунте уже была выставлена оценка для данного товара</Toast.Body>
        </Toast>
      </ToastContainer>

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
            <div className="d-flex align-items-center ">
              <p style={{ margin: 0, marginRight: 3, paddingTop: 4, fontSize: '1.4rem' }}>{device.rating}</p>
              <Rating
                initialRating={currentRating}
                onClick={(rate) => handleRating(rate)}
                emptySymbol={<FaStarRegular style={{ fontSize: '2rem', color: 'gold' }} />}
                fullSymbol={<FaStarSolid style={{ fontSize: '2rem', color: 'gold' }} />}
              />

            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card className="d-flex p-3  align-items-center flex-column justify-content-around">
            {(!device.price) ?
              <Spinner></Spinner> :
              <h3> {device.price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</h3>
            }

            <Button
              className="mb-2"
              onClick={(event) => {
                event.stopPropagation();
                basket.addDevice(device.id);

                console.log(basket.devices);
                console.log(basket.BScount);

              }}
            >Добавить в корзину</Button>
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
