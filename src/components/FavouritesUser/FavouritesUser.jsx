import "./FavouritesUser.css";
import React, {useState} from "react";
import toggleOn from "../../assets/images/toggle-on.svg";
import toggleOff from "../../assets/images/toggle-off.svg";

export default function FavouritesUser() {
    const [isToggled, setIsToggled] = useState(false);

    const toggleImage = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div className="favourites-user" onClick={toggleImage}>
            <div className="toggle">
                <img src={isToggled ? toggleOff : toggleOn} alt="Toggle"></img>
            </div>
            <div className="user-name">
                <span>user@example.com</span>
            </div>
        </div>
    );
}
