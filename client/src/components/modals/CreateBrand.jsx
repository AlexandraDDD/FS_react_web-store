import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Context } from "../..";

function CreateBrand({show, onHide}) {
  console.log("CreateBrand rendered");
  const [value, setValue] = useState("");
  const {brands} = useContext(Context)

  const addBrand = async () => {
    if (value.trim() !== "") {
      brands.createBrand({name: value})
      setValue(""); 
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} animation={true}  size="lg" centered>
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
