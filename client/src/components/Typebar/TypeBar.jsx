import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const TypeBar = observer(() => {
  const { types, device } = useContext(Context);

  const handleType= (type) => {
    if (device.selectedType.id === type.id) {
      device.setSelectedType({});
    } else {
      device.setSelectedType(type);
    }
  };
  return (
    <ListGroup>
      {types.types.map((type) => (
        <ListGroupItem
          style={{ cursor: "pointer" }}
          active={type.id === device.selectedType.id}
          key={type.id}
          onClick={() => handleType(type)}
        >
          {type.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
