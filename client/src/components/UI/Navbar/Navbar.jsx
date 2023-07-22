import React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import cl from "./Navbar.module.css";

import { useUserContext as useContext } from "@context/";
import {
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  SETTINGS_ROUTE,
} from "../../../router/constantRouter";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button, Container } from "react-bootstrap";

const NavBar = observer(() => {
  const user = useContext();
  const navigate = useNavigate();

  // Функция аннулирования авторизации
  const logOut = () => {
    user.data.setUser({});
    user.data.setIsAuth(false);
    // удаляем токен из локального хранилища
    localStorage.removeItem("token");
    navigate(LOGIN_ROUTE); // редирект на страницу магазина
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          className={cl.navbar__links}
          onClick={async () => navigate(PRODUCT_ROUTE)}>
          CRM система компании
        </Navbar.Brand>
        {user.data.isAuth ? (
          <Nav className={cl.navbar__links + " ml-auto"}>
            <Button
              variant={"outline-light"}
              onClick={async () => navigate(PRODUCT_ROUTE)}>
              Товары
            </Button>

            <Button
              variant={"outline-light"}
              onClick={async () => navigate(SETTINGS_ROUTE)}
              className="ml-2">
              Настройка
            </Button>

            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className="ml-2">
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className={cl.navbar__links + " ml-auto"}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}>
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
