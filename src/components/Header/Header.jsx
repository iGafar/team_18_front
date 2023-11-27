import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.svg";
import settings from "../../assets/images/settings.svg";
import "./Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logo}></img>
        </div>
        <div className="header__block">
          <img src={avatar}></img>
          <p>Имя пользователя</p>
          <div className="settings">
            <img onClick={() => setIsOpen(!isOpen)} src={settings}></img>
            {isOpen && <div className="settings__param">
							<p>Изменить иконку</p>
							<p>Изменить имя</p>
							<p>Изменить пароль</p>
							<p>Выйти</p>
						</div> }
          </div>
        </div>
      </div>
    </header>
  );
}
