import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Image,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { Context } from "../..";
import {
  createDevice,
  fetchOneDevice,
  updateDevice,
} from "../../API/deviceAPI";
import { observer } from "mobx-react-lite";
import { useForm, Controller } from "react-hook-form";
import { useMemo } from "react";
import { FaExclamationCircle } from "react-icons/fa";

const CreateDevice = observer(({ show, onHide, purpose }) => {

  const { device, edit, types, brands } = useContext(Context);
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  const [deviceToEdit, setDeviceToEdit] = useState(null);

  //форма
  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm({
    defaultValues: {
      info: [],
    },
  });

  //фото
  const [file, setFile] = useState(null);

  const selectFile = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setValue("img", e.target.files[0]);
  };

  //получение с сервера выбранного девайса
  if (purpose === 'edit') {
    useEffect(() => {
      const fetchData = async () => {
        if (edit.selectDevice) {
          try {
            const data = await fetchOneDevice(edit.selectDevice.id);
            setDeviceToEdit(data);
          } catch (error) {
            console.error("Error fetching device:", error);
          }
        }
      };

      fetchData();
    }, [edit.selectDevice]);
  }

  // начальная установка значений
  useEffect(() => {
    if (purpose === "edit" && deviceToEdit) {
      setValue("name", deviceToEdit.name);
      setValue("price", deviceToEdit.price);
      setValue("info", deviceToEdit.info);
      setValue("typeId", deviceToEdit.typeId);
      setValue("brandId", deviceToEdit.brandId);
      setValue("img", deviceToEdit.img);
      setInitialValuesSet(true);
    }
  }, [purpose, deviceToEdit, setValue]);


  // отправка формы
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", `${data.price}`);
    if (data.img) {
      formData.append("img", data.img);
    }
    formData.append("brandId", data.brandId);
    formData.append("typeId", data.typeId);
    formData.append("info", JSON.stringify(data.info));
    if (purpose === "create") {
      device.createDevice(formData).then(() => onHide());
    } else if (purpose === "edit" && deviceToEdit) {
      device.updateDevice(deviceToEdit.id, formData).then(() => {
        onHide();
      });
    }
  };

  const addInfo = () => {
    const info = watch("info");
    setValue("info", [
      ...info,
      { title: "", description: "", number: Date.now() },
    ]);
  };

  const removeInfo = (number) => {
    const info = watch("info");
    setValue(
      "info",
      info.filter((i) => i.number !== number),
    );
  };

  const changeInfo = (key, value, number) => {
    const info = watch("info");
    setValue(
      "info",
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i)),
    );
  };


  const DeviceType = useMemo(() => {
    const typeId = watch("typeId");
    return types.types.find((type) => type.id === typeId)?.name || "выберите тип";
  }, [watch("typeId"), setValue]);

  const DeviceBrand = useMemo(() => {
    const brandId = watch("brandId");
    return (
      brands.brands.find((brand) => brand.id === brandId)?.name || "выберите бренд"
    );
  }, [watch("brandId"), setValue]);


  return (
    <>
      <Modal show={show} onHide={onHide} animation={true} size="lg" centered>
        {(purpose === 'edit' && !initialValuesSet) ?
          <>
            <Spinner />
          </> :
          <>
            <Modal.Header closeButton>
              {purpose === "create" ? (
                <Modal.Title>Добавить устройство</Modal.Title>
              ) : (
                <Modal.Title>Изменить товар</Modal.Title>
              )}
            </Modal.Header>
            <Modal.Body>
              <Form
                className="d-flex flex-column aling-items-center justify-content-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Dropdown className="mb-2"  >
                  <Dropdown.Toggle>
                    {DeviceType} &nbsp;
                    {!watch("typeId") && errors.typeId && <FaExclamationCircle className="ml-2 text-white" />}
                    </Dropdown.Toggle>
                  <Dropdown.Menu  >
                    {types.types.map((type) => (
                      <Dropdown.Item
                        {...register("typeId", { required: 'Тип обязателен' })}
                        onClick={() => setValue("typeId", type.id)}
                        key={type.id}
                      >
                        {type.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                  <Dropdown.Toggle  >
                    {DeviceBrand}
                    &nbsp;
                    {!watch("brandId") && errors.brandId && <FaExclamationCircle className="ml-2 text-white" />}
                    </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {brands.brands.map((brand) => (
                      <Dropdown.Item
                        {...register("brandId", { required: 'Бренд обязателен' })}
                        onClick={() => setValue("brandId", brand.id)}
                        key={brand.id}
                      >
                        {brand.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                  className="mt-3"
                  placeholder="Введите название устройства"
                  {...register("name", { required: true })}
                />
                <Form.Control
                  className="mt-3"
                  placeholder="Введите стоимость устройства"
                  type="number"
                  {...register("price", { required: true })}
                />
                {(!file && purpose === 'edit') ? (
                  <>

                    <h5 className="mt-2"> старое фото</h5>
                    <Image
                      style={{ width: 200, height: 200 }}
                      src={process.env.REACT_APP_API_URL + watch("img")}
                    />
                  </>
                ) : (
                  <>
                    <h5 className="mt-2">
                      {purpose === 'create' ? 'фото' : 'новое фото'}
                    </h5>
                    <Image style={{ width: 200, height: 200 }} src={file} />
                  </>
                )}
                <Form.Control
                  required={purpose === "create"}
                  className="mt-3"
                  placeholder="Загрузите изображение устройства"
                  type="file"
                  onChange={selectFile}
                />
                <hr />
                <Button variant={"outline-dark"} onClick={addInfo} className="mb-2">
                  Добавить характеристики
                </Button>
                {watch("info") && watch("info").length > 0 ? (
                  watch("info").map((i) => (
                    <Row key={i.number} className="mb-2">
                      <Col md={4}>
                        <Form.Control
                          value={i.title}
                          onChange={(e) =>
                            changeInfo("title", e.target.value, i.number)
                          }
                          placeholder="Название"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Control
                          value={i.description}
                          onChange={(e) =>
                            changeInfo("description", e.target.value, i.number)
                          }
                          placeholder="Описание"
                        />
                      </Col>
                      <Col md={4}>
                        <Button
                          variant="outline-danger"
                          onClick={() => removeInfo(i.number)}
                        >
                          Удалить
                        </Button>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <p>Нет характеристик</p>
                )}
                <Modal.Footer>
                  <Button variant="secondary" onClick={onHide}>
                    Закрыть
                  </Button>
                  <Button variant="primary" type="submit">
                    {purpose === "create" ? "Добавить" : "Сохранить"}
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </>
        }

      </Modal>
    </>
  );
});

export default CreateDevice;
