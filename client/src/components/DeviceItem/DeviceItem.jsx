import React, { useContext, useState } from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../../utils/consts";
import { deleteDevice } from "../../API/deviceAPI";
import { Context } from "../..";
import { FaShoppingCart, FaStar } from "react-icons/fa";


function DeviceItem({ device, onRemove }) {
  const { user, modals, edit, basket } = useContext(Context);
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const deleteD = async (id) => {
    try {
      const res = await deleteDevice(id);
      if (res.status === 200) {
        setIsDeleted(true);
        onRemove(id);
      }
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };
  

  return (
    <Col
      md={12}
      onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
      style={{ opacity: isDeleted ? 0.5 : 1 }}
    >
      <div
        className="d-flex border border-secondary rounded mb-3 p-3 "
        style={{
          width: "100%",
          height: 200,
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <Image
          className="object-fit-cover"
          style={{ width: 200, height: 200 }}
          src={process.env.REACT_APP_API_URL + device.img}
        ></Image>
        <div
          className="p-2 d-flex flex-column justify-content-between"
          style={{ width: "100%" }}
        >
          <div className="d-flex pl-3 pr-3 align-items-center">
            <h5 style={{ margin: 0, marginRight: 5 }}>{device.name}</h5>
          </div>
          <p>{device.price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</p>
          <div className="d-flex align-items-center ">
            <p style={{ margin: 0, marginRight: 3 }}>{device.rating}</p>
            <FaStar />
          </div>
       
          <div className="d-flex align-items-end justify-content-end">
            {user.isAuth && (
              <div >
                <Button
                  style={{ marginRight: "10px" }}
                  type="button"
                  variant="outline-danger"
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteD(device.id);
                  }}
                >
                  Удалить
                </Button>
                <Button
                  style={{ marginRight: "10px" }}
                  type="button"
                  variant="outline-warning"
                  onClick={(event) => {
                    event.stopPropagation();
                    edit.setSelectDevice(device);
                    modals.setDeviceModalVisible(true);
                  }}
                >
                  Изменить
                </Button>
              </div>
            )}

            <Button
              type="button"
              variant="primary"
              onClick={(event) => {
                event.stopPropagation();
               basket.addDevice(device.id)
              }}
            >
               <FaShoppingCart />
            </Button>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default DeviceItem;
