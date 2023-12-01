import "./SiteFilter.css";
import React from "react";
import arrowDown from "../../assets/images/arrown-down.svg";
// import Select from "react-select/dist/declarations/src/Select";

export default function SiteFilter() {

	const options = [
		{ value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter" },
    { value: "youtube", label: "Youtube" },
    { value: "tiktok", label: "Tiktok" },
		{ value: "all", label: "Все сайты" },
	]

  return (
    <div className="news-filter">
      <div className="news-source-item">
        {/* <Select /> */}
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
              <input type="text" id="start-date" />
            </div>
            <div className="date-container">
              <label htmlFor="end-date">по</label>
              <input type="text" id="end-date" />
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
