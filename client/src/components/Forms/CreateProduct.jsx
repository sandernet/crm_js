// Модальное окно для добавления устройства

import React, { useContext, useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";

import { Form, Button, Stack, Row, Col, Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import ModalsWindows from "../UI/ModalsWindows/ModalsWindows";

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
    <ModalsWindows
      show={show}
      onHide={onHide}
      title={"Добавить товар"}
      action={() => alert("запустить нужную функцию")}>
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
    </ModalsWindows>
  );
});

export default CreateProduct;
