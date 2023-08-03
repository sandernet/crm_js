import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { TreeView, TreeItem } from "@mui/lab";
// import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import GetDataInfo from "../GetDataInfo/GetDataInfo";

import { useFetching } from "../../../hooks/useFetching";
import CategoryService from "../../../API/Product/Category/categoryService";

const MenuCategories = observer(({ setCategory }) => {
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

  const renderTree = (node) => {
    const hasChildren = node.children && node.children.length > 0;
    return (
      <TreeItem
        nodeId={node.id}
        label={node.name}
        onClick={() => setCategory(node.id)}>
        {hasChildren && node.children.map((child) => renderTree(child))}
      </TreeItem>
    );
  };

  return (
    <GetDataInfo Error={categoriesError} isLoading={isCategoriesLoading}>
      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
        sx={{ flexGrow: 1, maxWidth: "100%", overflowY: "auto" }}>
        {Array.isArray(categories)
          ? categories.map((category) => renderTree(category))
          : null}
      </TreeView>
    </GetDataInfo>
  );
});

export default MenuCategories;
