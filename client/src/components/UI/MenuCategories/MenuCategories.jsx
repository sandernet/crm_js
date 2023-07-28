import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Accordion } from "react-bootstrap";
import cl from "./MenuCategories.module.css";

import GetDataInfo from "../GetDataInfo/GetDataInfo";
import MenuItem from "./MenuItem";

import { useFetching } from "../../../hooks/useFetching";
import ProductService from "../../../API/Product/ProductService";

const MenuCategories = observer(({ setCategory }) => {
  console.log("------MenuCategories()------");
  const [categories, setCategories] = useState([]);

  // Приводит к иерархическому объекту категорий
  const buildHierarchy = (arr, parentId = null) => {
    const result = [];
    for (const item of arr) {
      if (item.parent_id === parentId) {
        const children = buildHierarchy(arr, item.externalCodeMS);
        if (children.length) {
          item.children = children;
        }
        result.push(item);
      }
    }
    return result;
  };

  // Загрузка Категорий товаров ---------------
  const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching(
    async () => {
      const response = await ProductService.getAllCategories();
      setCategories(buildHierarchy(response.data["rows"]));
    }
  );

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <GetDataInfo Error={categoriesError} isLoading={isCategoriesLoading}>
      <ul className={cl.prog_time_menu}>
        {categories.map((item) => (
          <MenuItem key={item.id} item={item} setCategory={setCategory} />
        ))}
      </ul>
    </GetDataInfo>
  );
});

export default MenuCategories;
// <Accordion>
//           <Accordion.Item eventKey="0">
//             <Accordion.Header onClick={() => setCategory(437)}>
//               Категория 1
//             </Accordion.Header>
//             <Accordion.Body>
//               <Accordion>
//                 <Accordion.Item eventKey="0">
//                   <Accordion.Header onClick={() => setCategory(425)}>
//                     Категория 1
//                   </Accordion.Header>
//                   <Accordion.Body>Категория 1</Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="1">
//                   <Accordion.Header>Категория 2</Accordion.Header>
//                   <Accordion.Body>Категория 2</Accordion.Body>
//                 </Accordion.Item>
//               </Accordion>
//             </Accordion.Body>
//           </Accordion.Item>
//           <Accordion.Item eventKey="1">
//             <Accordion.Header>Категория 2</Accordion.Header>
//             <Accordion.Body>
//               <Accordion>
//                 <Accordion.Item eventKey="0">
//                   <Accordion.Header>Категория 1</Accordion.Header>
//                   <Accordion.Body>Категория 1</Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="1">
//                   <Accordion.Header>Категория 2</Accordion.Header>
//                   <Accordion.Body>Категория 2</Accordion.Body>
//                 </Accordion.Item>
//               </Accordion>
//             </Accordion.Body>
//           </Accordion.Item>
//         </Accordion>
