import { observer } from "mobx-react-lite";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import CreateProduct from "../components/modalsWindows/CreateProduct";
import ProductList from "../components/ProductList";

import MyPagination from "../components/UI/MyPagination/MyPagination";
import ProductFilter from "../components/ProductFilter";
import MenuCategories from "../components/UI/MenuCategories/MenuCategories";
import GetDataInfo from "../components/UI/GetDataInfo/GetDataInfo";

import { useFetching } from "../hooks/useFetching";
import ProductService from "../API/Product/ProductService";
import { useProducts } from "../hooks/useProducts";
import { getPageCount } from "@utils/pages";

// Страница с товарами
const Products = observer(() => {
  console.log("------Products()------");

  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState(null);
  // Модальное окно
  const [CreateProductVisible, setCreateProductVisible] = useState(false);
  const [filter, setFilter] = useState({ sort: "name", query: "" });
  // общее количество страниц товаров
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  // Загрузка товаров ---------------
  const [fetchProducts, isPostsLoading, postError] = useFetching(
    async (limit, page, category) => {
      const offset = limit * (page - 1);
      const response = await ProductService.getAllProducts(
        limit,
        offset,
        category
      );
      setProduct(response.data["rows"]);
      const totalCount = response.data?.count;
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useEffect(() => {
    fetchProducts(limit, page, category);
  }, [page, limit, category]);

  useEffect(() => {
    setPage(1);
  }, [limit, category]);

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
      <ProductFilter
        title={"Товары"}
        filter={filter}
        setFilter={setFilter}
        setCreateProductVisible={setCreateProductVisible}
      />
      <Row>
        <Col xs md="3">
          <MenuCategories setCategory={setCategory} />
        </Col>
        <Col xs md="9">
          <GetDataInfo Error={postError} isLoading={isPostsLoading}>
            <ProductList products={sortedAndSearchedPosts} />
            <MyPagination
              page={page}
              changePage={changePage}
              totalPages={totalPages}
            />
          </GetDataInfo>
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
