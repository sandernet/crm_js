import About from "../pages/About";
import Products from "../pages/Products";
import ProductPage from "../pages/ProductPage";
import Login from "../pages/Login";


// Роутеры доступные только с авторизацией
export const privateRoutes = [
    { path: '/about', component: <About />, exact: true },
    { path: '/product', component: <Products />, exact: true },
    { path: '/product/:id', component: <ProductPage />, exact: true },
]

// Роутеры доступные БЕЗ авторизации
export const publicRoutes = [
    { path: '/login', component: <Login />, exact: true },
]