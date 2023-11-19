import "./SiteFilter.css";
import React from "react";
import arrowDown from "../../assets/images/arrown-down.svg";

export default function SiteFilter() {
    return (
        <div className="news-filter">
            <div className="news-source-item">
                <div className="accordion">
                    <div className="accordion-header">
                        <a className="accordion-title">Ресурс</a>
                        <img src={arrowDown}></img>
                    </div>
                </div>

                <div className="data-filters">
                    <div className="date-range">
                        <label className="margin-bottom-1rem">Дата</label>
                        <div className="date-container">
                            <label htmlFor="start-date">с</label>
                            <input type="text" id="start-date"/>
                        </div>
                        <div className="date-container">
                            <label htmlFor="end-date">по</label>
                            <input type="text" id="end-date"/>
                        </div>
                    </div>

                    <label className="margin-bottom-1rem">Метки</label>

                    <div className="tags-container">
                        <div className="tag-blue">
                            <span>Tag</span>
                            <button type="button">x</button>
                        </div>
                        <div className="tag-blue">
                            <span>Tag</span>
                            <button type="button">x</button>
                        </div>
                        <div className="tag-blue">
                            <span>Tag</span>
                            <button type="button">x</button>
                        </div>
                        <div className="tag-blue">
                            <span>Tag</span>
                            <button type="button">x</button>
                        </div>


                        <div className="tag-white">
                            <span>Tag</span>
                            <button type="button">x</button>
                        </div>
                        <div className="tag-white">
                            <span>Tag</span>
                            <button type="button">x</button>
                        </div>
                        <div className="tag-white">
                            <span>Tag</span>
                            <button type="button">x</button>
                        </div>
                        <div className="tag-white">
                            <span>Tag</span>
                            <button type="button">x</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
