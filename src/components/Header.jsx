import React from "react";
import logo from "../assets/images/logo.svg";
import avatar from "../assets/images/avatar.svg"
import settings from "../assets/images/settings.svg"

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logo}></img>
        </div>
				<div className="header__block">
					<img src={avatar}></img>
					<p>Имя пользователя</p>
					<img src={settings}></img>
				</div>
      </div>
    </header>
  );
}
