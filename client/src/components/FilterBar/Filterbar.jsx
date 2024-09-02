import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, ButtonGroup, Col, Form, Row } from "react-bootstrap";
import { Context } from "../..";

const Filterbar = observer(() => {
  const { device } = useContext(Context);
  const quantity = [5, 10, 15];

  const handlePriceSort = (direction) => {
    device.setSortType("price");
    device.setPriceSortDirection(direction);
  };

  const handleRatingSort = (direction) => {
    device.setSortType("rating");
    device.setRatingSortDirection(direction);
  };
  const all = () => {
    device.setSelectedType({});
    device.setSelectedBrand({});
  };

  return (
    <Row className="mt-3">
      <Col xs={12} className="text-center mb-3">
        <Button className="w-100" variant={"outline-dark"} onClick={all}>
          Все товары
        </Button>
      </Col>
      <Col xs={12} className="mb-3 pl-2">
        <Form.Group  controlId="formLimit">
          <Form.Label column sm={12} className="mb-0 mr-2 p-0">
            Кол-во товаров на странице:
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              as="select"
              value={device.limit}
              onChange={(e) => device.setLimit(Number(e.target.value))}
            >
              {quantity.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
      </Col>
      <Col xs={12} className="d-flex flex-column flex-xl-row align-items-center mb-3">
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <Button
            variant={device.sortType === "price" && device.priceSortDirection === "asc" ? "secondary" : "outline-secondary"}
            onClick={() => handlePriceSort("asc")}
          >
            ↑
          </Button>
          <p className="m-0 mx-2">Цена</p>
          <Button
            variant={device.sortType === "price" && device.priceSortDirection === "desc" ? "secondary" : "outline-secondary"}
            onClick={() => handlePriceSort("desc")}
          >
            ↓
          </Button>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button
            variant={device.sortType === "rating" && device.ratingSortDirection === "asc" ? "secondary" : "outline-secondary"}
            onClick={() => handleRatingSort("asc")}
          >
            ↑
          </Button>
          <p className="m-0 mx-2">Рейтинг</p>
          <Button
            variant={device.sortType === "rating" && device.ratingSortDirection === "desc" ? "secondary" : "outline-secondary"}
            onClick={() => handleRatingSort("desc")}
          >
            ↓
          </Button>
        </div>
      </Col>
    </Row>
  );
});

export default Filterbar;
