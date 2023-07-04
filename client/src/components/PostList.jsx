import React from "react";
import PostItem from "./PostItem";
// import {TransitionGroup, CSSTransition} from "react-transition-group";

const PostList = ({ product, title, remove }) => {
  if (!product.length) {
    return <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {/* <TransitionGroup> */}
      {product.map(
        (product, index) => (
          // <CSSTransition
          //     key={product.id}
          //     timeout={500}
          //     classNames="post"
          // >
          <PostItem
            key={product.id}
            remove={remove}
            number={index + 1}
            product={product}
          />
        )
        // </CSSTransition>
      )}
      {/* </TransitionGroup> */}
    </div>
  );
};

export default PostList;
