import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import MenuTreeView from "./MenuTreeView";
import GetDataInfo from "../GetDataInfo/GetDataInfo";
import { useFetching } from "../../../hooks/useFetching";
import CategoryService from "../../../API/Product/Category/categoryService";

const MenuCategories = observer(({ setItemMenu }) => {
  console.log("------MenuCategories()------");
  const [categories, setCategories] = useState([]);

  // Загрузка Категорий товаров ---------------
  const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching(
    async () => {
      const response = await CategoryService.getAllCategories();

      Array.isArray(response.data["rows"]) &&
        setCategories(
          await CategoryService.buildHierarchy(response.data["rows"])
        );
    }
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log(categories);
  return (
    <GetDataInfo Error={categoriesError} isLoading={isCategoriesLoading}>
      <MenuTreeView arr={categories} setItemMenu={setItemMenu} />
    </GetDataInfo>
  );
});

export default MenuCategories;
