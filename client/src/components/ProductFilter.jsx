import React from "react";
import { Stack, Form } from "react-bootstrap";
import MySelect from "./UI/select/MySelect";

const ProductFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <h1 style={{ padding: 20 }}>Товары</h1>

        <Form.Control
          placeholder="Поиск ..."
          value={filter.query}
          onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        />
        <div className="vr" />

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
      </Stack>
    </div>
  );
};

export default ProductFilter;
