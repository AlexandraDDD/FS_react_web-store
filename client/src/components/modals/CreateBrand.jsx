import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createBrand } from "../../http/BrandAPI";

function CreateBrand({ show, onHide, updateBrands }) {
  const [value, setValue] = useState("");
  const addBrand = async () => {
    try {
      const data = await createBrand({ name: value });
      setValue("");
      onHide();
      updateBrands();
    } catch (error) {
      console.error("Error adding brand:", error);
      alert("Ошибка при добавлении бренда. Пожалуйста, попробуйте снова.");
    }
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
