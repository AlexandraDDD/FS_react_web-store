import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Image, Modal, Row } from 'react-bootstrap';
import { Context } from '../..';
import { createDevice, fetchOneDevice, updateDevice } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { useForm, Controller } from 'react-hook-form';
import { useMemo } from 'react';



const CreateDevice = observer(({ show, onHide, purpose }) => {
  const { device, edit } = useContext(Context);
  const [deviceToEdit, setDeviceToEdit] = useState(null);
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      info: [],
    },
  });

  const [initialValuesSet, setInitialValuesSet] = useState(false);

  const [file, setFile] = useState(null)

  const selectFile = e => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setValue('img', e.target.files[0])

  }

  useEffect(() => {
    const fetchData = async () => {
      if (edit.selectDevice) {
        try {
          const data = await fetchOneDevice(edit.selectDevice.id);
          setDeviceToEdit(data);
        } catch (error) {
          console.error('Error fetching device:', error);
        }
      }
    };

    fetchData();
  }, [edit.selectDevice]);

  // начальная установка значений
  useEffect(() => {
    if (purpose === 'edit' && deviceToEdit) {
      setValue('name', deviceToEdit.name);
      setValue('price', deviceToEdit.price);
      setValue('info', deviceToEdit.info);
      setValue('typeId', deviceToEdit.typeId);
      setValue('brandId', deviceToEdit.brandId);
      setValue('img', deviceToEdit.img);

      setInitialValuesSet(true);
    }
  }, [purpose, deviceToEdit, setValue]);

  // Отслеживание изменений в полях формы и вывод их значений в консоль
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log('Form field changed:', { name, type, value });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = data => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', `${data.price}`);
    if (data.img) {
      formData.append('img', data.img);
    }
    formData.append('brandId', data.brandId);
    formData.append('typeId', data.typeId);
    formData.append('info', JSON.stringify(data.info));

    if (purpose === 'create') {
      createDevice(formData).then(data => onHide());
    } else if (purpose === 'edit' && deviceToEdit) {
      updateDevice(deviceToEdit.id, formData).then(data => { 
        device.updateDevice(data); 
        onHide() });
    }
  };

  const addInfo = () => {
    const info = watch('info');
    setValue('info', [...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = number => {
    const info = watch('info');
    setValue('info', info.filter(i => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    const info = watch('info');
    setValue('info', info.map(i => (i.number === number ? { ...i, [key]: value } : i)));
  };


  const DeviceType = useMemo(() => {
    if (!initialValuesSet) return 'Загрузка...';
    const typeId = watch('typeId');
    console.log('typeId - ' + typeId);
    console.log('device.types - ' + JSON.stringify(device.types));
    return device.types.find(type => type.id === typeId)?.name || 'не найден';
  }, [initialValuesSet, watch, device.types]);

  const DeviceBrand = useMemo(() => {
    if (!initialValuesSet) return 'Загрузка...';
    const brandId = watch('brandId');
    return device.brands.find(brand => brand.id === brandId)?.name || 'не найден';
  }, [initialValuesSet, watch, device.brands]);

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
          <Form className='d-flex flex-column aling-items-center justify-content-center' onSubmit={handleSubmit(onSubmit)}>

            <Dropdown className='mb-2'>
              <Dropdown.Toggle>{DeviceType}</Dropdown.Toggle>
              <Dropdown.Menu>
                {device.types.map(type => (
                  <Dropdown.Item onClick={() => setValue('typeId', type.id)} key={type.id}>
                    {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle>{DeviceBrand}</Dropdown.Toggle>
              <Dropdown.Menu>
                {device.brands.map(brand => (
                  <Dropdown.Item onClick={() => setValue('brandId', brand.id)} key={brand.id}>
                    {brand.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              className='mt-3'
              placeholder='Введите название устройства'
              {...register('name')}
            />
            <Form.Control
              className='mt-3'
              placeholder='Введите стоимость устройства'
              type='number'
              {...register('price')}
            />
            {
              !file ? (
                <>
                  <h5 className='mt-2'> старое фото</h5>
                  <Image style={{ width: 200, height: 200 }} src={process.env.REACT_APP_API_URL + watch('img')} />

                </>

              ) : (
                <>
                  <h5 className='mt-2'>новое фото</h5>
                  <Image style={{ width: 200, height: 200 }} src={file} />
                </>
              )
            }
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
            {watch('info') && watch('info').length > 0 ? (
              watch('info').map(i => (
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
              ))
            ) : (
              <p>Нет характеристик</p>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Закрыть
              </Button>
              <Button variant="primary" type="submit">
                {purpose === 'create' ? 'Добавить' : 'Сохранить'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>


      </Modal>
    </>
  );
});

export default CreateDevice;
