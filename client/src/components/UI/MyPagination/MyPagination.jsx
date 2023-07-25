import { getPagesArray } from "@utils/pages";
import React from "react";
import { Pagination } from "react-bootstrap";

const MyPagination = ({ totalPages, page, changePage }) => {
  let pagesArray = getPagesArray(totalPages);
  const startIndex = page - 5 < 0 ? 0 : page - 5;
  const endIndex =
    page + 5 >= pagesArray.length ? pagesArray.length - 1 : page + 5;

  pagesArray = pagesArray.slice(startIndex, endIndex + 1);

  return (
    <Pagination>
      <Pagination.First onClick={() => changePage(1)} />

      <Pagination.Ellipsis />

      {pagesArray.map((p) =>
        p == page ? (
          <Pagination.Item key={p} onClick={() => changePage(p)} active>
            {p}
          </Pagination.Item>
        ) : (
          <Pagination.Item key={p} onClick={() => changePage(p)}>
            {p}
          </Pagination.Item>
        )
      )}

      <Pagination.Ellipsis />
      <Pagination.Next />
      <Pagination.Last onClick={() => changePage(totalPages)} />
    </Pagination>
  );
};

export default MyPagination;
