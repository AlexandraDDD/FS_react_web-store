import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Context } from "..";
import { action } from "mobx";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { observer } from "mobx-react-lite";
import { fetchDevicesIdsReq } from "../API/deviceAPI";


const Basket = observer(() => {
  const { basket } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [basketDevices, setBasketDevices] = useState([]);

  useEffect(() => {
    // Получаем данные корзины
    let basketPromise = Promise.resolve();
    if (basket.devices.length === 0) {
      basketPromise = action(() => {
        return basket.fetchBasket().finally(() => {
          console.log(basket.devices);
        });
      })();
    } else {
      console.log("Товары в корзине уже загружены");
    }
    // После получения данных корзины, извлекаем идентификаторы и делаем запрос за полными устройствами
    basketPromise.then(() => {
      //массив id нужных товаров
      const ids = basket.devices.map(device => device.deviceId);

      let devicesPromise = fetchDevicesIdsReq(ids).then(devices => {
        const updatedDevices = devices.map(device => {
          const basketDevice = basket.devices.find(basketDevice => basketDevice.deviceId === device.id);
          return { ...device, count: basketDevice.count };
        });
        setBasketDevices(updatedDevices);
      });

      Promise.all([devicesPromise]).finally(() => {
        setLoading(false);
      });
    });
  }, [basket.BScount]);

  useEffect(() => {
    let totalPrice = 0;
    if (basketDevices.length > 0) {
      basketDevices.forEach((device) => {
        if (device.price && device.count) {
          totalPrice += device.price * device.count;
        }
      });
      setTotalPrice(totalPrice);
    }
  }, [basketDevices, basket.BScount]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <section style={{ backgroundColor: "#eee", height: "100%", minHeight: "100vh"}}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <MDBTypography tag="h2" className="fw-bold mb-0 text-black">
                          Корзина
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {basket.BScount} items
                        </MDBTypography>
                      </div>
                      {basketDevices.map((device) => (
                        <>
                          <hr className="my-4" />
                          <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                            <MDBCol md="2" lg="2" xl="2">
                              <MDBCardImage
                                src={process.env.REACT_APP_API_URL + device.img}
                                fluid className="rounded-3" alt="device img" style={{maxHeight: 200}} />
                            </MDBCol>
                            <MDBCol md="3" lg="3" xl="3">
                              <MDBTypography tag="h5" className="text-muted">
                                {device.brand}
                              </MDBTypography>
                              <MDBTypography tag="h5" className="text-black mb-0">
                                {device.name}
                          
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="2" lg="2" xl="2" className="d-flex align-items-center">
                              <Button variant="light" size="sm"
                               onClick={(event) => {
                                event.stopPropagation();
                                basket.removeDevice(device.id)
                              }} 
                              > <FaMinus /></Button>

                              <h5>{device.count}</h5>


                              <Button variant="light" size="sm" 
                              onClick={(event) => {
                                event.stopPropagation();
                                basket.addDevice(device.id)
                              }} >
                                <FaPlus />
                              </Button>
                            </MDBCol>
                            <MDBCol md="4" lg="3" xl="3" className="text-end">
                              <MDBTypography tag="h5" className="mb-0">
                                {device.price?.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="1" lg="1" xl="1" className="text-end">
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  basket.removeDevice(device.id)
                                }}>
                                <FaTrashAlt />
                              </div>

                            </MDBCol>
                          </MDBRow>

                        </>

                      ))}
                    </div>
                  </MDBCol>
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography tag="h4" className="fw-bold mb-3 mt-1 pt-1">
                        Детали заказа
                      </MDBTypography>

                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-3">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Итоговая сумма
                        </MDBTypography>
                        <MDBTypography tag="h5">{totalPrice.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</MDBTypography>
                      </div>

                      <Button variant="dark" block size="md">
                        Оформить заказ
                      </Button>
                      <Button variant="dark" >
                        Очистить корзину(метод на серваке)
                      </Button>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

  );
})

export default Basket;
