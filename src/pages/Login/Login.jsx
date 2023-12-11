import "./Login.css";
import { useDocumentTitle } from "../../hooks/setDocumentTitle";
import React, { useState, useEffect } from "react";
import loaderGif from "../../assets/images/loader.gif";
import eye from "../../assets/images/login/eye.gif";
import view from "../../assets/images/login/view.svg";
import view_off from "../../assets/images/login/view-off.svg";
import postRequest from "../../functions/postRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/slices/currentUserSlice";

export default function Login() {
  useDocumentTitle("login");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, isSuccess, isError, setIsError, sendRequest } =
    postRequest();

  async function loginHandler(evt) {
    evt.preventDefault();
    const url = "https://parsing-app.onrender.com/auth/jwt/login";
    const data = { username: username, password: password };
    sendRequest(url, "POST", data);
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCurrentUser({ email: username }));
      navigate("/user");
    }
  }, [isSuccess, dispatch, navigate, username]);

  return (
    <div className="login-page login-flex">
      <div className="login-main login-flex">
        <div className="login-logo">
          <img src={eye} alt="" />
        </div>
        <div className="login-form-container">
          <form>
            <label htmlFor="username" className="login-label-text">
              Логин
            </label>
            <input
              type="text"
              id="username"
              autoComplete="on"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setIsError(false);
              }}
            />
            <label htmlFor="password" className="login-label-text">
              Пароль
            </label>
            <div className="login-password-container">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                autoComplete="on"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsError(false);
                }}
              />
              <button
                id="login-toggle-password"
                type="button"
                onClick={() => setShowPass(!showPass)}
              >
                <img src={showPass ? view_off : view} alt="" />
              </button>
            </div>
            {isLoading ? (
              <button className="button-loader" disabled>
                <img className="login-loader" src={loaderGif} alt="loader" />
              </button>
            ) : (
              <button
                onClick={(evt) => {
                  loginHandler(evt);
                }}
              >
                ВОЙТИ
              </button>
            )}
            {isError && (
              <div className="login-error">
                <p>Ошибка авторизации</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
