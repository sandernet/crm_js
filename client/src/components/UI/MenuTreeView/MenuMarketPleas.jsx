import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import MenuTreeView from "./MenuTreeView";
import GetDataInfo from "../GetDataInfo/GetDataInfo";
import { useFetching } from "../../../hooks/useFetching";
import MarketPlace from "../../../API/MarketPlace/MarketPlace";

const MenuMarketPleas = observer(({ setItemMenu }) => {
  const [marketPleas, setMarketPleas] = useState([]);

  // Загрузка Категорий товаров ---------------
  const [fetchData, isDataLoading, dataError] = useFetching(async () => {
    const response = await MarketPlace.getAllMarketPlace();

    Array.isArray(response.data["rows"]) &&
      setMarketPleas(response.data["rows"]);
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GetDataInfo Error={dataError} isLoading={isDataLoading}>
      <MenuTreeView arr={marketPleas} setItemMenu={setItemMenu} />
    </GetDataInfo>
  );
});

export default MenuMarketPleas;
