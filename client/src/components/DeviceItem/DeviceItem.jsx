import React, { useContext, useState } from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../../utils/consts";
import { deleteDevice } from "../../http/deviceAPI";
import { Context } from "../..";

function DeviceItem({ device, onRemove, addToBasket }) {
  const { user, modals, edit } = useContext(Context);
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
  const add = (id) => {
    addToBasket(id);
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
          <p>{device.price}</p>
          <div className="d-flex align-items-center ">
            <p style={{ margin: 0, marginRight: 3 }}>{device.rating}</p>
            <svg
              width="23px"
              height="23px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>
            </svg>
          </div>
          {/*   {isDeleted && (
                        <div className="text-danger">Товар удален</div>
                    )} */}
          <div className="d-flex align-items-end justify-content-end">
            {user.isAuth && (
              <div /* className='border p-1' style={{ marginRight: '10px' }} */>
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
                add(device.id);
              }}
            >
              {/* В корзину */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="21px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 5L19 12H7.37671M20 16H8L6 3H3M11.5 7L13.5 9M13.5 9L15.5 7M13.5 9V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{" "}
            </Button>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default DeviceItem;
