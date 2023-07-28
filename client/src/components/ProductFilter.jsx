import React from "react";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import MySelect from "./UI/select/MySelect";

const ProductFilter = ({
  title,
  filter,
  setFilter,
  setCreateProductVisible,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <h3 style={{ padding: 10 }}>{title}</h3>
        </Col>
        <Col md={2} style={{ padding: 10 }}>
          <Button
            variant="outline-success"
            onClick={() => setCreateProductVisible(true)}>
            Создать
          </Button>
        </Col>
        <Col md={3} style={{ padding: 10 }}>
          <Form.Control
            placeholder="Поиск ..."
            value={filter.query}
            onChange={(e) => setFilter({ ...filter, query: e.target.value })}
          />
        </Col>
        <Col md={2} style={{ padding: 10 }}>
          <MySelect
            defaultValue="Сортировка"
            value={filter.sort}
            onChange={(selectedSort) =>
              setFilter({ ...filter, sort: selectedSort })
            }
            options={[
              { value: "name", name: "По наименованию" },
              { value: "id", name: "По id" },
            ]}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductFilter;
