import React, {FC} from "react";

//Import styles
import '../css/header.css';
import {Link} from "react-router-dom";

export const Header: FC = () => {
    return (
        <header className="header">
            <Link to="/" className="header-logo">
                LibraryApplication
            </Link>

            <Link to="/login" className="login-btn">
                Авторизация
            </Link>
        </header>
    );
};