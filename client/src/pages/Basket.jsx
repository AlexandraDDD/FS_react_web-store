import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Spinner } from "react-bootstrap";
import { Context } from "..";
import { fetchBasket, removeDevice } from "../API/BasketAPI";
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

  useEffect(() => {
    action(() => {
      device.fetchDevices();
    })();
    setLoading(false);
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

    <section className="h-110 h-custom" style={{ backgroundColor: "#eee" }}>
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
                          3 items!!!!!
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
                              <MDBBtn color="link" className="px-2">
                                <MDBIcon fas icon="minus" />
                              </MDBBtn>

                              <MDBInput type="number" min="0" defaultValue={1} size="sm" />

                              <MDBBtn color="link" className="px-2">
                                <MDBIcon fas icon="plus" />
                              </MDBBtn>
                            </MDBCol>
                            <MDBCol md="4" lg="3" xl="3" className="text-end">
                              <MDBTypography tag="h5" className="mb-0">
                              {device.price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="1" lg="1" xl="1" className="text-end">
                              <div
                              style={{cursor: "pointer"}} 
                              onClick={(event) => {
                                event.stopPropagation();
                                remove(device.id);
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

{/*                       <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h6" className="text-uppercase">
                          items 3!!!
                        </MDBTypography>
                        <MDBTypography tag="h6">€ 132.00</MDBTypography>
                      </div>

                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                        Доставка
                      </MDBTypography>

                      <div className="mb-4 pb-2">
                        <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}>
                          <option value="1">Standard-Delivery- €5.00</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                          <option value="4">Four</option>
                        </select>
                      </div>



                      <hr className="my-4" /> */}

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
