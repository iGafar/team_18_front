import "./AdminSitesCheckButton.css";
import chevron from "../../../assets/images/chevron.svg";
import checkbox from "../../../assets/images/checkbox.svg";
import checkbox_checked from "../../../assets/images/checkbox-checked.svg";
import { useState } from "react";





export default function AdminSitesCheckButton({handleSiteToggle, siteList}) {
    const [showSites, setShowSites] = useState(false)

    function siteClick(site) {
        site.active = !site.active
        handleSiteToggle(site)
    }

    return (
        <div className="checkSites-container">
            <div className="checkButton-wrapper" onClick={() => {setShowSites(!showSites)}}>
                <div className="checkButton-inner">
                    <p>Выбрать сайты</p>
                    <div><img src={ chevron } alt="" /></div>
                </div>
            </div>
            {showSites &&
            <div className="sitesList-wrapper">

                {siteList.map((site, index) => (
                    <div className="sitesList-element" key={index} onClick={() => siteClick(site)}>
                        <div className="sitesList-checkbox">
                            <img src={ site.active ? checkbox_checked : checkbox } alt="" />
                        </div>
                        <p>{ site.name }</p>
                    </div>
                ))}

            </div>
            }
        </div>
    )
}