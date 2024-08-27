import React, {  useContext, } from "react";
import { Button, Container } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateDevice from "../components/modals/CreateDevice";
import CreateBrand from "../components/modals/CreateBrand";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const Admin = observer(() => {
  const { modals, types, brands } = useContext(Context);

  useEffect(() => {
    if (types.types.length === 0)
      types.fetchTypes();
    if (brands.brands.length === 0)
      brands.fetchBrands();
  }, []);

  const handleDeleteType = async (id) => {
      await types.removeType(id);
  };
  const handleDeleteBrand = async (id) => {
      await brands.removeBrand(id);
  };

  return (
    <Container className="d-flex flex-column mt-5">
      <div>
        <h4>Типы</h4>
        {types.types.map((type) => (
          <div
            className=" mb-2 d-flex aling-items-center justify-content-between"
            key={type.id}
          >
            {type.name}
            <Button onClick={() => handleDeleteType(type.id)}>удалить</Button>
          </div>
        ))}
        <Button
          onClick={() => modals.setTypeModalVisible(true)}
          variant={"outline-dark"}
          className="pb-2 mb-2"
        >
          Добавить тип
        </Button>
      </div>
      <div>
        <h4>Бренды</h4>
        {brands.brands.map((brand) => (
          <div
            className=" mb-2 d-flex aling-items-center justify-content-between"
            key={brand.id}
          >
            {brand.name}
            <Button onClick={() => handleDeleteBrand(brand.id)}>удалить</Button>
          </div>
        ))}
        <Button
          onClick={() => modals.setBrandModalVisible(true)}
          variant={"outline-dark"}
          className="pb-2 mb-2"
        >
          Добавить бренд
        </Button>
      </div>

      <Button
        onClick={() => modals.setDeviceModalVisible(true)}
        variant={"outline-dark"}
        className="pb-2 mb-2"
      >
        Добавить устройство
      </Button>

      <CreateType
        show={modals.typeModalVisible}
        onHide={() => modals.setTypeModalVisible(false)}
      ></CreateType>
      <CreateDevice
        purpose="create"
        show={modals.deviceModalVisible}
        onHide={() => modals.setDeviceModalVisible(false)}
      ></CreateDevice>
      <CreateBrand
        show={modals.brandModalVisible}
        onHide={() => modals.setBrandModalVisible(false)}
      ></CreateBrand>
    </Container>
  );
});

export default Admin;
