// Страница авторизации

import React, { useState } from "react";

import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  PRODUCT_ROUTE,
} from "../router/constantRouter";

import { login, registration } from "../API/User/UserService";

import { observer } from "mobx-react-lite";
import {
  UserContext as Context,
  useUserContext as useContext,
} from "@context/";

const Auth = observer(() => {
  const user = useContext();

  const location = useLocation(); // получем адрес из хука
  const isLogin = location.pathname === LOGIN_ROUTE;
  const navigate = useNavigate();

  // состояние
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Функция авторизации пользователя
  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      console.log(data);
      // после авторизации и регистрации сразу передаем в контекст пользователя
      user.data.setUser(data);
      user.data.setIsAuth(true);
      navigate(PRODUCT_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      /* перемещаем окно авторизации на середину - высота NAVBAR */
      style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className="p-4">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-4"
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Form.Group className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                Нет аккаунта?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться!</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунта? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </div>
            )}
            <Button variant={"outline-success"} onClick={click}>
              {isLogin ? "Войти" : "Регистрация"}
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
