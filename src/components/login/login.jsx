import './Login.css'
import { useDocumentTitle } from "../../hooks/setDocumentTitle"
import { useState } from "react";
import eye from "../../assets/images/login/eye.gif";
import view from "../../assets/images/login/view.svg";
import view_off from "../../assets/images/login/view-off.svg";



export default function Login() {
    useDocumentTitle('login');
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="login-page login-flex">
            <div className="login-main login-flex">
                <div className="login-logo"><img src={eye} alt=""/></div>
                <div className="login-form-container">
                    <form action="">
                        <label htmlFor="username" className="login-label-text">Логин</label>
                        <input type="text" id="username" autoComplete="on"/>
                        <label htmlFor="password" className="login-label-text">Пароль</label>
                        <div className="login-password-container">
                            <input type={ showPass ? 'text' : 'password' } id="password" autoComplete="on"/>
                            <button id="login-toggle-password" type="button" onClick={() => setShowPass(!showPass)}>
                                <img src={ showPass ? view_off : view } alt=""/>
                            </button>
                        </div>
                        <button>ВОЙТИ</button>
                    </form>
                </div>
            </div>
        </div>
    );
}