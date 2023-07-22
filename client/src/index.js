import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import './styles/App.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";

import {
  UserContext as Context,
  useUserContext as useContext,
} from "@context/";

const Default = () => {

  const user = useContext();
  // const options = {
  //   cachePolicy: "no-cache",
  //   interceptors: {
  //     request: async ({ options }) => {
  //       options.headers = {
  //         "Content-Type": "application/json",
  //         Authorization: "JWT " + localStorage.getItem("token"),
  //       };
  //       return options;
  //     },
  //     response: (props) => {
  //       if (props.response.status === 401) {
  //         dataUser.data.setIsUser(false);
  //       }
  //       return props.response;
  //     },
  //   },
  // };

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    <Default />
  </Context>
);

