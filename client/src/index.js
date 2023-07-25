import React from 'react';
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
  console.log('-------ingex.js APP-----------');

  const user = useContext();
  console.log(user.data);
  !user.data.isAuth ? user.data.setIsAuth(true) : console.log(user.data.isAuth)

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

