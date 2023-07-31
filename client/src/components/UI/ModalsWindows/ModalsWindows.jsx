// Модальное окно для добавления устройства
import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Stack } from "react-bootstrap";

// show jn  отвечает за то виден компонент или нет
// onHide функция которая скрывает модальное окно
const ModalsWindows = ({ show, onHide, title, children, action }) => {
  return (
    <Modal
      show={show}
      onHide={onHide} // функция
      size="xl"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={3}>
          <Button variant="outline-danger" onClick={onHide}>
            Отмена
          </Button>
          <div className="vr" />
          <Button variant="outline-success" onClick={() => action()}>
            Добавить
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalsWindows;
