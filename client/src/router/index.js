import About from "../pages/About";
import Settings from "../pages/Settings";
import Products from "../pages/Products";
import CartMarketPleas from "../pages/CartMarketPleas";
import ProductPage from "../pages/ProductPage";
import Login from "../pages/Login";

import {
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    ABOUT_ROUTE,
    PRODUCT_ROUTE,
    CARTMP_ROUTE,
    SETTINGS_ROUTE
} from "./constantRouter";


// Роутеры доступные только с авторизацией
export const privateRoutes = [
    { path: SETTINGS_ROUTE, component: <Settings />, exact: true },
    { path: PRODUCT_ROUTE, component: <Products />, exact: true },
    { path: CARTMP_ROUTE, component: <CartMarketPleas />, exact: true },
    { path: PRODUCT_ROUTE + '/:id', component: <ProductPage />, exact: true },
    { path: ABOUT_ROUTE, component: <About />, exact: true },
]

// Роутеры доступные БЕЗ авторизации
export const publicRoutes = [

    { path: LOGIN_ROUTE, component: <Login />, exact: true },
    { path: REGISTRATION_ROUTE, component: <Login />, exact: true },
]
