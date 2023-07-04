import React from "react";
import MyInput from "./UI/Input/MyInput";
import MyButton from "./UI/button/MyButton";
import { useFetching } from "../hooks/useFetching";
import ProductService from "../API/Product/ProductService";
// import MySelect from "./UI/select/MySelect";

const PropertyMP = ({ product, mp }) => {
  const [fetchPostById, isLoading, error] = useFetching(
    async (mpId, productId) => {
      console.log(mpId, productId);
      const response = await ProductService.getPropertyMP(mpId, productId);
    }
  );

  return (
    <div className="propertysmp">
      <div className="propertymp"></div>
      <MyInput
        // value="Значение" //{filter.query}
        onChange={(e) => console.log(e.target.value)}
        placeholder="Введите значение"
      />
      <MyButton>Сохранить</MyButton>
    </div>
  );
};

export default PropertyMP;
