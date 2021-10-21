import React, {SyntheticEvent, useState} from "react";

//Import styles
import '../css/authentication.css';

//Import services
import {validateEmail, validatePasswordConfirm} from "../services/validationService";
import {login, register, User} from "../services/authenticationServices";
import {Link, Redirect} from "react-router-dom";

//Change styles of input dynamically while input
const setInputState = (hasError: boolean, htmlInput: HTMLInputElement): void => {
    if (hasError) {
        htmlInput.classList.add('input-error');
        htmlInput.classList.remove('input-correct');
    } else {
        htmlInput.classList.remove('input-error');
        htmlInput.classList.add('input-correct');
    }
}

export enum AuthenticationMode {
    REGISTER,
    LOGIN
}

export const AuthenticationPage = (mode: AuthenticationMode) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorState, setErrorState] = useState<boolean>(true);

    const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const emailInput = event.target;
        let isValid: boolean = validateEmail(emailInput.value);
        setInputState(!isValid, emailInput);

        setErrorState(isValid);
        setEmail(emailInput.value);
    };

    const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const passwordInput = event.target;
        let isValid: boolean = passwordInput.value !== '';
        setInputState(!isValid, passwordInput);

        setPassword(passwordInput.value);
        setErrorState(!isValid);
    };

    const handlePasswordConfirmInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const passwordConfirmInput: HTMLInputElement = event.target;
        let isValid: boolean = validatePasswordConfirm(password ?? "", passwordConfirmInput.value);
        setInputState(!isValid, passwordConfirmInput);

        setErrorState(!isValid);
    };

    const submitForm = (e: SyntheticEvent) => {
        e.preventDefault();

        if (errorState) {
            alert("Ошибки при вводе данных! Проверьте правильность!");
            return false;
        }

        const user: User = {email: email, password: password};

        if (mode === AuthenticationMode.REGISTER) {
            register(user).then(response => {
                if (response !== undefined) {
                    alert(response);
                } else {
                    return <Redirect to="/login"/>
                }
            });
        } else {
            login(user).then(response => {
                if (response !== undefined) {
                    alert(response);
                } else {
                    return <Redirect to="/"/>
                }
            });
        }
    };

    return (
        <div className="form-wrapper">
            <form method="POST" className="form-container" onSubmit={submitForm}>

                <div className="form-param">
                    <div className="form-param__label">Email</div>
                    <div className="form-param__input">
                        <input type="text" className="custom-input" onChange={handleEmailInput}/>
                    </div>
                </div>

                <div className="form-param">
                    <div className="form-param__label">Пароль</div>
                    <div className="form-param__input">
                        <input type="text" className="custom-input" onChange={handlePasswordInput}/>
                    </div>
                </div>

                <div className={mode === AuthenticationMode.REGISTER ? 'form-param' : 'form-param form-param-hidden'}>
                    <div className="form-param__label">Подтверждение пароля</div>
                    <div className="form-param__input">
                        <input type="text" className="custom-input" onChange={handlePasswordConfirmInput}/>
                    </div>
                </div>

                <button className="ctrl-btn authenticate-btn"
                        type="submit">{mode === AuthenticationMode.REGISTER ? "Зарегистрироваться" : "Войти"}</button>

                {
                    mode === AuthenticationMode.REGISTER ?
                        <div className='redirect-block'>Уже зарегистрированы?
                            <Link to="/login" className="redirect-link">Войти</Link>
                        </div>
                        :
                        <div className='redirect-block'>Не создали аккаунт?:
                            <Link to="/register" className="redirect-link">Зарегистрироваться</Link>
                        </div>
                }
            </form>
        </div>
    );
};