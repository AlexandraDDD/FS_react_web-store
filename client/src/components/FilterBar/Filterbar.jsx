import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import {
  Button,
  Card,
  Dropdown,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Context } from "../..";

const Filterbar = observer(() => {
  const { device } = useContext(Context);
  const quantity = [2, 5, 10];
  const all = () => {
    device.setSelectedType({});
    device.setSelectedBrand({});
  };
  return (
    <Row className=" mt-3 d-flex justify-content-center align-items-center">
      <Button style={{ width: 200 }} variant={"outline-dark"} onClick={all}>
        Все товары
      </Button>
      <Dropdown>
        <p className=" mt-3 mb-0 pb-0">Количество товаров на странице</p>
        <Dropdown.Toggle>
          {device.limit || "Количество товаров на странице"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {quantity.map((q) => {
            return (
              <Dropdown.Item onClick={() => device.setLimit(q)} key={q}>
                {" "}
                {q}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Row>
  );
});

export default Filterbar;
