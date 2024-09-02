import React, { useContext, useState } from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../../utils/consts";
import { deleteDevice } from "../../API/deviceAPI";
import { Context } from "../..";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { FaStar as FaStarSolid } from "react-icons/fa";
import { FaRegStar as FaStarRegular } from "react-icons/fa";

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
          height: 210,
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <Image
          className="object-fit-cover"
          style={{ width: 180, height: 180, borderRadius: 5}}
          src={process.env.REACT_APP_API_URL + device.img}
        ></Image>
        <div
          className="p-2 d-flex flex-column justify-content-between"
          style={{ width: "100%", marginLeft: 15 }}
        >
          <div className="d-flex pl-3 pr-3 align-items-center">
            <h5 style={{ margin: 0, marginRight: 5 }}>{device.name}</h5>
          </div>
          <p>{device.price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</p>
          <div className="d-flex align-items-center ">
            <p style={{ margin: 0, marginRight: 3, paddingTop: 4 }}>{device.rating}</p>
            <Rating
            initialRating={device.rating}
            readonly
            emptySymbol={<FaStarRegular />}
            fullSymbol={<FaStarSolid  />}
          />

          </div>
       
          <div className="d-flex align-items-end justify-content-end">
            {user.user.role == 'ADMIN' && (
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
                basket.addDevice(device.id);
/*                 console.log(basket.devices);
                console.log(basket.BScount); */
                
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
