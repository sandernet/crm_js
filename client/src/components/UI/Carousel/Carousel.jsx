import React, { useState } from "react";
// import Slider from "react-slick";
import ProductService from "../../../API/Product/ProductAPI";
import cl from "./Carousel.module.css"; // Импортируйте свой файл стилей

const Carousel = ({ imageUrls }) => {
  const imageUrlsFilter = (typeImage = "miniature") => {
    const test = imageUrls.filter((image) => image.typeImage === typeImage);
    return test;
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };
  return (
    <div className={cl.container}>
      {/* <Slider {...settings}> */}
      {imageUrls?.length > 0 ? (
        imageUrlsFilter().map((imageUrl) => (
          <div key={imageUrl.id}>
            <img
              src={ProductService.imageUrlById(imageUrl.id)}
              alt={imageUrl.fileName}
            />
            <p>{imageUrl.fileName}</p>
          </div>
        ))
      ) : (
        <p>Не картинок</p>
      )}
      {/* </Slider> */}
    </div>
  );
};

export default Carousel;

// const Carousel = ({ imageUrls }) => {
//   const [state, setState] = useState({ display: true, width: 300 });

//   const settings = {
//     dots: false,
//     className: "center",
//     centerMode: true,
//     infinite: true,
//     centerPadding: "60px",
//     slidesToShow: 3,
//     vertical: true,
//     verticalSwiping: true,
//   };
//   return (
//     <div className={cl.container}>
//       <button
//         className="button"
//         onClick={() =>
//           setState({
//             width: this.state.width + 100,
//           })
//         }>
//         {" "}
//         increase{" "}
//       </button>
//       <button
//         className="button"
//         onClick={() =>
//           setState({
//             width: this.state.width - 100,
//           })
//         }>
//         {" "}
//         decrease{" "}
//       </button>
//       <Slider {...settings}>
//         {imageUrls.map((imageUrl) => (
//           <div key={imageUrl.id}>
//             <img
//               src={ProductService.imageUrlById(imageUrl.id)}
//               alt={imageUrl.fileName}
//             />
//             <p className="legend">{imageUrl.fileName}</p>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };
