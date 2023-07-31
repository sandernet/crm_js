import { observer } from "mobx-react-lite";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import CreateCardMP from "../components/Forms/CreateCardMP";
import ProductList from "../components/ProductList";

import MyPagination from "../components/UI/MyPagination/MyPagination";
import ProductFilter from "../components/ProductFilter";
import MenuCategories from "../components/UI/MenuCategories/MenuCategories";
import GetDataInfo from "../components/UI/GetDataInfo/GetDataInfo";

import { useFetching } from "../hooks/useFetching";
import CardMPAPI from "../API/CardMP/CardMPAPI";
import { useProducts } from "../hooks/useProducts";
import { getPageCount } from "@utils/pages";

// Страница с товарами
const CartMarketPleas = observer(() => {
  console.log("------Products()------");

  const [cardMP, setCardMP] = useState([]);
  const [category, setCategory] = useState(null);
  // Модальное окно
  const [ModalsWindowsVisible, setModalsWindowsVisible] = useState(false);
  const [filter, setFilter] = useState({ sort: "name", query: "" });
  // общее количество страниц товаров
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  // Загрузка товаров ---------------
  const [fetchProducts, isPostsLoading, postError] = useFetching(
    async (limit, page, category) => {
      const offset = limit * (page - 1);
      const response = await CardMPAPI.getAllCardMP(limit, offset, category);
      setCardMP(response.data["rows"]);
      const totalCount = 565;
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useEffect(() => {
    fetchProducts(limit, page, category);
  }, [page, limit, category]);

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <Container>
      <ProductFilter
        title={"Карточки маркетплейсов"}
        filter={filter}
        setFilter={setFilter}
        setCreateProductVisible={setModalsWindowsVisible}
      />
      <Row>
        <Col xs md="3">
          <div>
            <p>Список маркетплейсов</p>
          </div>
          {/* <MenuCategories setCategory={setCategory} /> */}
        </Col>
        <Col xs md="9">
          <GetDataInfo Error={postError} isLoading={isPostsLoading}>
            <div>
              <p>Список товаров по паркетплейсам</p>
            </div>
            {/* <ProductList products={setCardMP} /> */}
            <MyPagination
              page={page}
              changePage={changePage}
              totalPages={totalPages}
            />
          </GetDataInfo>
        </Col>
      </Row>

      {/*    Добавляем модальные окна */}
      <CreateCardMP
        show={ModalsWindowsVisible}
        onHide={() => setModalsWindowsVisible(false)}
      />
    </Container>
  );
});
export default CartMarketPleas;
