import React, { useState } from 'react';
import "./Sidebar.css";
import SiteFilter from "../SiteFilter/SiteFilter";
import edit from "../../assets/images/edit.svg";
import favourite from "../../assets/images/favorite.svg";
import search from "../../assets/images/search.svg";
import Favourites from "../Favourites/Favourites";
import Scenarios from "../Scenarios/Scenarios";

export default function Sidebar() {
    const [activeTab, setActiveTab] = useState('search');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="sidebar">
            <div className="tab-button-container">
                <div className={`tab-button ${activeTab === 'search' ? 'button-clicked' : ''}`}
                     onClick={() => handleTabClick('search')}>
                    <img src={search} alt="Search"></img>
                    <span>Поиск</span>
                </div>

                <div className={`tab-button ${activeTab === 'favourite' ? 'button-clicked' : ''}`}
                     onClick={() => handleTabClick('favourite')}>
                    <img src={favourite} alt="Favourite"></img>
                    <span>Избранное</span>
                </div>

                <div className={`tab-button ${activeTab === 'edit' ? 'button-clicked' : ''}`}
                     onClick={() => handleTabClick('edit')}>
                    <img src={edit} alt="Edit"></img>
                    <span>Сценарий</span>
                </div>
            </div>

            {activeTab === 'search' && <SiteFilter/>}
            {activeTab === 'favourite' && <Favourites/>}
            {activeTab === 'edit' && <Scenarios/>}
        </div>
    );
}
