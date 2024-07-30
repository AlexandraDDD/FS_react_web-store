import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { Context } from '../..';
import { createDevice, fetchOneDevice, updateDevice } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { fetchTypes } from '../../http/TypesAPI';
import { fetchBrands } from '../../http/BrandAPI';

const CreateDevice = observer(({ show, onHide, purpose }) => {
  const { device, edit } = useContext(Context);
  const [deviceToEdit, setDeviceToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (edit.deviceToEdit) {
        try {
          const data = await fetchOneDevice(edit.deviceToEdit.id);
          setDeviceToEdit(data);
        } catch (error) {
          console.error('Error fetching device:', error);
        }
      }
    };

    fetchData();
  }, [edit.deviceToEdit]);


  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState(null);
  const [info, setInfo] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    if (purpose === 'edit' && deviceToEdit) {
      setName(deviceToEdit.name);
      setPrice(deviceToEdit.price);
      setInfo(deviceToEdit.info);
      setSelectedType(deviceToEdit.type);
      setSelectedBrand(deviceToEdit.brand);

      console.log(name);
      console.log(price);
      console.log(info);
      console.log(selectedType);
    }

  }, [purpose, deviceToEdit]);

  const selectFile = e => {
    setImg(e.target.files[0]);
  };
  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };
  const removeInfo = number => {
    setInfo(info.filter(i => i.number !== number));
  };
  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', img);
    formData.append('brandId', selectedBrand);
    formData.append('typeId', selectedType);
    formData.append('info', JSON.stringify(info));

    if (purpose === 'create') {
      createDevice(formData).then(data => onHide());
    } else if (purpose === 'edit' && deviceToEdit) {
      updateDevice(deviceToEdit.id, formData).then(data => onHide());
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} animation={false} size='lg' centered>
        <Modal.Header closeButton>
          {purpose === 'create' ? (
            <Modal.Title>Добавить устройство</Modal.Title>
          ) : (
            <Modal.Title>Изменить товар</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form className='d-flex flex-column aling-items-center justify-content-center'>
            <Dropdown className='mb-2'>
              <Dropdown.Toggle>{selectedType?.name || 'Выберите тип'}</Dropdown.Toggle>
              <Dropdown.Menu>
                {device.types.map(type => (
                  <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>
                    {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle>{selectedBrand?.name || 'Выберите бренд'}</Dropdown.Toggle>
              <Dropdown.Menu>
                {device.brands.map(brand => (
                  <Dropdown.Item onClick={() => device.setSelectedBrand(brand)} key={brand.id}>
                    {brand.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              className='mt-3'
              placeholder='Введите название устройства'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Form.Control
              className='mt-3'
              placeholder='Введите стоимость устройства'
              type='number'
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
            />
            <Form.Control
              className='mt-3'
              placeholder='Загрузите изображение устройства'
              type='file'
              onChange={selectFile}
            />
            <hr />
            <Button variant={'outline-dark'} onClick={addInfo} className='mb-2'>
              Добавить характеристики
            </Button>
            {info.map(i => (
              <Row key={i.number} className='mb-2'>
                <Col md={4}>
                  <Form.Control
                    value={i.title}
                    onChange={e => changeInfo('title', e.target.value, i.number)}
                    placeholder='Название'
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    value={i.description}
                    onChange={e => changeInfo('description', e.target.value, i.number)}
                    placeholder='Описание'
                  />
                </Col>
                <Col md={4}>
                  <Button variant='outline-danger' onClick={() => removeInfo(i.number)}>
                    Удалить
                  </Button>
                </Col>
              </Row>
            ))}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {purpose === 'create' ? 'Добавить' : 'Сохранить'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default CreateDevice;
