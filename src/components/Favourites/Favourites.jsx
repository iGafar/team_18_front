import "./Favourites.css";
import React from "react";
import FavouritesUser from "../FavouritesUser/FavouritesUser";

export default function Favourites() {
    return (
       <div className="favourites-container">
           <FavouritesUser/>
           <FavouritesUser/>
       </div>
    );
}
