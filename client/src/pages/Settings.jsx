import React from "react";
import { Button, Container, Row, Col, Table, Dropdown } from "react-bootstrap";

// Страница с товарами
function Settings() {
  const run = () => {};

  console.log("------Settings()------");
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1 style={{ padding: 20 }}>Страница настройками</h1>
        </Col>
      </Row>

      <Row>
        <Col xs lg="3">
          <div className="d-grid gap-2">
            <Button
              variant="outline-success"
              onClick={() => alert("Загрузить города из Excel")}>
              Загрузить города из Excel
            </Button>
            <Button variant="outline-success">Создать файл для Авито</Button>
            <Button variant="outline-success" onClick={() => run()}>
              Загрузить параметры из Авито (не работает)
            </Button>
          </div>
          <div style={{ paddingTop: 10 }}>
            <Dropdown>
              <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                Выпадающее меню
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">1 Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">2 Action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">3 Action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
        <Col xs lg="9">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Settings;
