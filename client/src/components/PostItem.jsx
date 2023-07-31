import React from "react";
import MyButton from "./UI/button/MyButton";
import { useNavigate } from "react-router-dom";
import ProductService from "../API/Product/ProductAPI";

const PostItem = (props) => {
  const router = useNavigate();

  return (
    <div className="post">
      <div className="images_icon">
        {/* {props.product.images.length > 0
                ? <img src={ProductService.imageUrlBy(props.product.images)}/>
                : <img alt='Нету фото'/>
            } */}{" "}
        <img alt="Пока нету фото" />
        {/* <img src={imageUrl(props.product.images)}/> */}
        {/* <img src={ProductService.getImageById(props.product.images)} alt='картинка'/>  */}
      </div>
      <div className="post__content">
        <div>
          {props.product.id}. {props.product.idMS}
        </div>
        <strong> {props.product.name}</strong>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => router(`/product/${props.product.id}`)}>
          Открыть
        </MyButton>
        <MyButton onClick={() => props.remove(props.product)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
