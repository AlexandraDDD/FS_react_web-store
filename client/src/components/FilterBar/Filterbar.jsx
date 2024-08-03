import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Context } from "../..";

const Filterbar = observer(() => {
  const { device } = useContext(Context);
  const quantity = [5, 10, 15];

  const all = () => {
    device.setSelectedType({});
    device.setSelectedBrand({});
  };

  return (
    <Row className="mt-3 d-flex justify-content-center align-items-center">
      <Button style={{ width: 200 }} variant={"outline-dark"} onClick={all}>
        Все товары
      </Button>
      <Form.Group as={Row} controlId="formLimit" className="d-flex align-items-center ml-3 mt-4">
        <Form.Label column sm={8} className="mb-0 mr-2">Кол-во товаров на странице:</Form.Label>
        <Col sm={4}>
          <Form.Control as="select" value={device.limit} onChange={(e) => device.setLimit(Number(e.target.value))}>
            {quantity.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
    </Row>
  );
});

export default Filterbar;
