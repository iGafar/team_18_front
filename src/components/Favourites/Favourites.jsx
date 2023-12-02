import "./Favourites.css";
import React from "react";
import toggleOn from "../../assets/images/toggle-on.svg";

export default function Favourites() {
    return (
       <div className="favourites-container">
           <div className="favourites-user">
               <div className="toggle">
                   <img src={toggleOn}></img>
               </div>
               <div className="user-name">
                   <span>Имя пользователя</span>
               </div>
           </div>

           <div className="favourites-user">
               <div className="toggle">
                   <img src={toggleOn}></img>
               </div>
               <div className="user-name">
                   <span>Имя пользователя</span>
               </div>
           </div>
       </div>
    );
}
