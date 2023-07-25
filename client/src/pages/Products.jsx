import { observer } from "mobx-react-lite";
import React, { useState, useRef, useEffect } from "react";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";

import CreateProduct from "../components/modalsWindows/CreateProduct";
import ProductList from "../components/ProductList";

import Loader from "../components/UI/Loader/Loader";
import MyPagination from "../components/UI/MyPagination/MyPagination";
import ProductFilter from "../components/ProductFilter";

import { useFetching } from "../hooks/useFetching";
import ProductService from "../API/Product/ProductService";
import { useProducts } from "../hooks/useProducts";
import { getPageCount } from "@utils/pages";

// Страница с товарами
const Products = observer(() => {
  console.log("------Products()------");

  const [products, setProduct] = useState([]);
  // Модальное окно
  const [CreateProductVisible, setCreateProductVisible] = useState(false);
  const [filter, setFilter] = useState({ sort: "name", query: "" });
  // общее количество страниц товаров
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const offset = limit * (page - 1);
      const response = await ProductService.getAll(limit, offset);
      setProduct([...products, ...response.data["rows"]]);
      const totalCount = 565;
      setTotalPages(getPageCount(totalCount, limit));
    }
  );
  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  // Свой hook
  const sortedAndSearchedPosts = useProducts(
    products,
    filter.sort,
    filter.query
  );

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <ProductFilter filter={filter} setFilter={setFilter} />
        </Col>
      </Row>

      <Row>
        <Col xs md="2">
          <div className="d-grid gap-2">
            <Button
              variant="outline-success"
              onClick={() => setCreateProductVisible(true)}>
              Создать товар
            </Button>
            <Button variant="outline-success">Создать файл для Авито</Button>
            <Button
              variant="outline-success"
              onClick={() => console.log("Нажата кнопка")}>
              Загрузить параметры из Авито (не работает)
            </Button>
          </div>
        </Col>
        <Col xs md="10">
          {postError && (
            <Alert variant="danger">Произошла ошибка ${postError}</Alert>
          )}
          {isPostsLoading ? (
            <Loader />
          ) : (
            <div>
              <ProductList products={sortedAndSearchedPosts} />
              <MyPagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
              />
            </div>
          )}
        </Col>
      </Row>

      {/*    Добавляем модальные окна */}
      <CreateProduct
        show={CreateProductVisible}
        onHide={() => setCreateProductVisible(false)}
      />
    </Container>
  );
});
export default Products;
