import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createType } from "../../API/TypesAPI";
import { Context } from "../..";

function CreateType({ show, onHide }) {
  const {types} = useContext(Context)
  const [value, setValue] = useState("");

  const addType = () => {
    types.createType()
  };

  return (
    <>
      <Modal show={show} onHide={onHide} animation={false} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Добавить тип</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              placeholder="введите название типа"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></Form.Control>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={() => addType()}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateType;
