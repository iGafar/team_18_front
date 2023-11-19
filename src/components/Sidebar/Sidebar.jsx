import "./Sidebar.css";
import React from "react";
import SiteFilter from "../NewsFilter/SiteFilter";
import edit from "../../assets/images/edit.svg";
import favourite from "../../assets/images/favorite.svg";
import search from "../../assets/images/search.svg";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="tab-button-container">
                <div className="tab-button button-clicked">
                    <img src={search}></img>
                    <span>Поиск</span>
                </div>
                <div className="tab-button">
                    <img src={favourite}></img>
                    <span>Избранное</span>
                </div>
                <div className="tab-button">
                    <img src={edit}></img>
                    <span>Сценарий</span>
                </div>
            </div>

            <SiteFilter/>
        </div>
    );
}
