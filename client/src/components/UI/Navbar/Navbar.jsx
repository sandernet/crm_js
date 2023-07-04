import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
import cl from './Navbar.module.css';

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        <div className={cl.navbar}>
            <div >
                <Link style={{padding : 15}} to="/product">Товары</Link>
                <Link to="/about">О сайте</Link>
            </div>
            <div style={{marginLeft: "auto"}}>
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
</div>
        </div>
    );
};

export default Navbar;
