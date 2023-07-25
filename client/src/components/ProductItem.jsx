// import { observer } from "mobx-react-lite";
import React from "react";
// Страница с товарами
const ProductItem = ({ product }) => {
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>
        {product.price.map((price) => (
          <div key={price.id}>
            <small>
              {price.name} {price.price}
            </small>
          </div>
        ))}
      </td>
      <td>{product.idMS}</td>
      <td>{product.categoryId}</td>
    </tr>
  );
};

export default ProductItem;
