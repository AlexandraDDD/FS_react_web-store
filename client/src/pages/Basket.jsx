import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Spinner } from "react-bootstrap";
import { Context } from "..";
import { fetchBasket, removeDevice, removeDeviceReq } from "../API/BasketAPI";
import { fetchDevices } from "../API/deviceAPI";
import { action } from "mobx";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { FaShoppingCart, FaTrashAlt, FaTimes } from "react-icons/fa";


function Basket() {
  const { device, basket } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [basketDevices, setBasketDevices] = useState([]);

  useEffect(() => {
    if (device.devices.length === 0) {
      action(() => {
        device.fetchDevices().finally(() => {
          console.log(device.devices);
        });
      })();
    } else {
      console.log("товары уже загружены");
    }
    action(() => {
      basket.fetchBasket().finally(() => {
        console.log(basket.devices);
      });
    })();

    Promise.all([device.fetchDevices(), basket.fetchBasket()]).finally(() => {
      setLoading(false);
    });
  }, []);


  useEffect(() => {
    if (!loading && device.devices.length > 0 && basket.devices.length > 0) {
      const bDevices = basket.devices
        .map((basketDevice) => {
          const d = device.devices.find(
            (device) => device.id === basketDevice.deviceId,
          );
          /*  if (d && d.price && d.count) { */
          return { ...d, count: basketDevice.count };
          /*    } 
              return null; */
        })
      /*    .filter((device) => device !== null); */

      console.log(bDevices);

      setBasketDevices(bDevices);

      let totalPrice = 0;
      if (basketDevices.length > 0) {
        basketDevices.forEach((device) => {
          if (device.price && device.count) {
            totalPrice += device.price * device.count;
          }
        });
      }
      setTotalPrice(totalPrice);

      console.log(totalPrice);


    }
  }, [loading, basket.devices]);



  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <section style={{ backgroundColor: "#eee", height: "100%" }}>
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
                                fluid className="rounded-3" alt="Cotton T-shirt" />
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
                              {/*    <MDBBtn color="link" className="px-2">
                                <MDBIcon fas icon="minus" />
                              </MDBBtn> */}
                              <MDBInput type="number" min="0" defaultValue={device.count} size="sm" />
                              {/*   <MDBBtn color="link" className="px-2">
                                <MDBIcon fas icon="plus" />
                              </MDBBtn> */}
                            </MDBCol>
                            <MDBCol md="4" lg="3" xl="3" className="text-end">
                              <MDBTypography tag="h5" className="mb-0">
                                {device.price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}
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

                      <MDBBtn color="dark" block size="md">
                        Оформить заказ
                      </MDBBtn>
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
}

export default Basket;
