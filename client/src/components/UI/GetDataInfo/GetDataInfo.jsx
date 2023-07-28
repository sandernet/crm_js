import React from "react";
import Loader from "../../UI/Loader/Loader";

const GetDataInfo = (props) => {
  console.log("------GetDatainfo()------");
  const { Error, isLoading, children } = props;
  return (
    <>
      {Error && <Alert variant="danger">Произошла ошибка ${Error}</Alert>}
      {isLoading ? (
        <Loader />
      ) : (
        <div>{children}</div>
        // <ul className={cl.prog_time_menu}>
        //   {categories.map((item) => (
        //     <MenuItem key={item.id} item={item} setCategory={setCategory} />
        //   ))}
        // </ul>
      )}
    </>
  );
};

export default GetDataInfo;
