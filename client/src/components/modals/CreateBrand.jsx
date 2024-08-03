import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createBrand } from "../../API/BrandAPI";
import { Context } from "../..";

function CreateBrand({ show, onHide}) {
  const [value, setValue] = useState("");
  const {brands} = useContext(Context)
  const addBrand = async () => {
    brands.createBrand()
  };

  return (
    <>
      <Modal show={show} onHide={onHide} animation={false} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Добавить бренд</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="введите название бренда"
            ></Form.Control>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={() => addBrand()}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateBrand;
