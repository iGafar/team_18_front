import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.svg";
import settings from "../../assets/images/settings.svg";
import "./Header.css";
import {useSelector} from "react-redux"

export default function Header() {
  const currentUser = useSelector((state) => state.currentUser);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logo}></img>
        </div>
        <div className="header__block">
          <img src={avatar}></img>
          <p>{currentUser.email}</p>
          <div className="settings">
            <img onClick={() => setIsOpen(!isOpen)} src={settings}></img>
            {isOpen && <div className="settings__param">
							<button>Изменить иконку</button>
							<button>Изменить имя</button>
							<button>Изменить пароль</button>
							<button>Выйти</button>
						</div> }
          </div>
        </div>
      </div>
    </header>
  );
}
