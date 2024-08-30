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
    <Row className="mt-3 d-flex justify-content-center align-items-center">
      <Col md={12} className="text-center">
        <Button className="w-100" variant={"outline-dark"} onClick={all}>
          Все товары
        </Button>
      </Col>
      <Form.Group as={Row} controlId="formLimit" className="d-flex align-items-center ml-3 mt-3   mb-sm-3">
        <Form.Label column sm={8} className="mb-0 mr-2 p-0">Кол-во товаров на странице:</Form.Label>
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

      <div className=" d-flex  justify-content-between align-items-center w-50 ">
        <Button 
          variant={device.sortType === "price" && device.priceSortDirection === "asc" ? "secondary" : "outline-secondary"}
          onClick={() => handlePriceSort("asc")}
        >
          ↑
        </Button>
        <p>Цена </p>
        <Button
          variant={device.sortType === "price" && device.priceSortDirection === "desc" ? "secondary" : "outline-secondary"}
          onClick={() => handlePriceSort("desc")}
        >
        ↓
        </Button>
      </div>
      <div className=" d-flex  justify-content-between align-items-center w-50 ">
        <Button
          variant={device.sortType === "rating" && device.ratingSortDirection === "asc" ? "secondary" : "outline-secondary"}
          onClick={() => handleRatingSort("asc")}
        >
         ↑
        </Button>
        <p>Рейтинг </p>
        <Button
          variant={device.sortType === "rating" && device.ratingSortDirection === "desc" ? "secondary" : "outline-secondary"}
          onClick={() => handleRatingSort("desc")}
        >
         ↓
        </Button>
      </div>
      {/* <Form.Group controlId="formSort">
      <Form.Label>Сортировать по:</Form.Label>
      <Form.Control as="select" value={device.sortType} onChange={handleSortChange}>
        <option value="rating">Рейтингу</option>
        <option value="price">Цене</option>
      </Form.Control>
    </Form.Group> */}
    </Row>
  );
});

export default Filterbar;
