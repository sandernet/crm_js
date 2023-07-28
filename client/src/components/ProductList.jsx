import React from "react";
import ProductItem from "../components/ProductItem";
import { Table } from "react-bootstrap";

// Страница с товарами
const ProductList = ({ products }) => {
  if (!products.length) {
    return (
      <h1 style={{ textAlign: "center" }}>Товаров не в текущей категории</h1>
    );
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Наименование</th>
          <th>Цена</th>
          <th>Цена со скидкой</th>
          <th>Маркетплейсы</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;
