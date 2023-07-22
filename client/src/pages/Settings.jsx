import React from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";

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
            <Button variant="outline-success">Загрузить города из Excel</Button>
            <Button variant="outline-success">Создать файл для Авито</Button>
            <Button variant="outline-success" onClick={() => run()}>
              Загрузить параметры из Авито (не работает)
            </Button>
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
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
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
