import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { Context } from "../..";

const Brandbar = observer(() => {
  const { device, brands } = useContext(Context);
  const handleBrand = (brand) => {
    if (device.selectedBrand.id === brand.id) {
      device.setSelectedBrand({});
    } else {
      device.setSelectedBrand(brand);
    }
  };
  return (
    <Row className="d-flex">
    {brands.brands.map((brand) => (
      <Card
        style={{
          cursor: "pointer",
          width: "fit-content",
          marginRight: 15,
          backgroundColor:
            brand.id === device.selectedBrand.id ? "blue" : "transparent",
            color:  brand.id === device.selectedBrand.id ? "#FFFFFF" : "#000000",
        }}
        active={(brand.id === device.selectedBrand.id).toString()}
        key={brand.id}
        onClick={() => handleBrand(brand)}
      >
        {brand.name}
      </Card>
    ))}
  </Row>
  );
});

export default Brandbar;
