import React, { useState } from "react";
import "./NewsSourceItem.css";
import toggleOn from "../../assets/images/toggle-on.svg";
import arrowDown from "../../assets/images/arrown-down.svg";

export default function NewsSourceItem() {
  const [hidden, setHidden] = useState(false);

    return (
        <div className="news-source-item">
            <div className="accordion">
                <div className="accordion-header" >
                    <img className="accordion-radio" src={toggleOn} />
                    <a className="accordion-title">Title</a>
                    <img src={arrowDown}></img>
                </div>
            </div>
        </div>
    );
}
