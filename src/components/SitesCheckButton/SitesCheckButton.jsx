import "./SitesCheckButton.css";
import chevron from "../../assets/images/chevron.svg";
import checkbox from "../../assets/images/checkbox.svg";
import checkbox_checked from "../../assets/images/checkbox-checked.svg";
import { useState } from "react";

export default function SitesCheckButton({ handleSiteToggle, siteList }) {
  const [showSites, setShowSites] = useState(false);
  return (
    <div className="checkSites-container">
      <div
        className="checkButton-wrapper"
        onClick={() => {
          setShowSites(!showSites);
        }}
      >
        <div className="checkButton-inner">
          <p>Выбрать сайты</p>
          <div>
            <img src={chevron} alt="" />
          </div>
        </div>
      </div>
      {showSites && (
        <div className="sitesList-wrapper">
          {siteList.map((site, index) => (
            <div
              className="sitesList-element"
              key={site.id}
              onClick={() => handleSiteToggle(site)}
            >
              <div className="sitesList-checkbox">
                <img
                  src={site.is_active ? checkbox_checked : checkbox}
                  alt=""
                />
              </div>
              <p>{site.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
