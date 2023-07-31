import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import ProductService from "../API/Product/ProductAPI";
import Loader from "../components/UI/Loader/Loader";
import Carousel from "../components/UI/Carousel/Carousel";
import PropertyMP from "../components/PropertyMP";

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  //   const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await ProductService.getById(id);
    setProduct(response.data["rows"][0]);
  });
  //   const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
  //     const response = await ProductService.getCommentsByPostId(id);
  //     setComments(response.data);
  //   });

  useEffect(() => {
    fetchPostById(params.id);
    // fetchComments(params.id);
  }, []);

  console.log("============================================");
  console.log(product);
  return (
    <div className="App">
      <div className="product-cart">
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <Carousel imageUrls={product.images} />

            <div>
              {product.id}. {product.name}
            </div>
            <div>
              <h1>{product.name}</h1>
            </div>
            <div>
              <h3>Свойства</h3>
              {product?.property?.length ? (
                product?.property.map((item) => (
                  <div key={item.id}>
                    <p>
                      {item.name} - {item.value}
                    </p>
                  </div>
                ))
              ) : (
                <p> свойств нету</p>
              )}
              <h3>Цены</h3>
              {product?.price?.length ? (
                product?.price.map((item) => (
                  <div key={item.id}>
                    <p>
                      {item.name} - {item.price}
                    </p>
                  </div>
                ))
              ) : (
                <p> цены не заданы</p>
              )}
            </div>
          </div>
        )}
        <PropertyMP product={product} />
      </div>

      {/* <h1>
                Комментарии
            </h1>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm =>
                        <div key={comm.id} style={{marginTop: 15}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
            </div> */}
    </div>
  );
};

export default ProductPage;
