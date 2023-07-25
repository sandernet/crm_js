// Модальное окно для добавления устройства

import React, { useContext, useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";

import { Form, Button, Stack, Row, Col, Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
// import { Context } from "../../index";
// import { creatDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";

// Передаем два пробса
// show jn  отвечает за то виден компонет или нет
// onHide функция которая скрывает модальное окно

const CreateProduct = observer(({ show, onHide }) => {
  // Получем контекс
  //   const { device } = useContext(Context);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);

  //   // При открытие модального окна подгружаем в выпадающие списки типы и бренды
  //   useEffect(() => {
  //     // получение  типов
  //     fetchTypes().then((data) => device.setTypes(data));

  //     // Получение брендов
  //     fetchBrands().then((data) => device.setBrands(data));
  //   }, []);

  // Выбираем файл
  const selectFile = (e) => {
    // берем файл по индексу 0
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", "Бренд");
    formData.append("typeId", "Тип");

    console.log(formData);

    // creatDevice(formData).then((data) => onHide());
  };

  return (
    <Modal
      show={show}
      onHide={onHide} // функция
      size="xl"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить товар
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3"
                  placeholder={"Введите название товара"}
                />
              </Form>
            </Col>
          </Row>
          <Stack direction="horizontal" gap={4}>
            <Form>
              <Form.Control
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-3"
                placeholder={"Введите цену устройства"}
                type="number"
              />
            </Form>
            <Form>
              <Form.Control
                className="mt-3"
                placeholder={"Выберете изображение устройства"}
                type="file"
                onChange={selectFile}
              />
            </Form>
          </Stack>
          <hr />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={3}>
          <Button variant="outline-danger" onClick={onHide}>
            Отмена
          </Button>
          <div className="vr" />
          <Button
            variant="outline-success"
            onClick={() => alert("Сохранение товара")}>
            Добавить
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateProduct;
