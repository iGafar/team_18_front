import React from "react";
import "./NewsBlock.css";
import view from "../../assets/images/view-card.svg";
import sort from "../../assets/images/sort.svg";
import trash from "../../assets/images/trash.svg";
import NewsItem from '../NewsItem/NewsItem'

export default function NewsBlock() {
  return (
    <div className="newsPage">

      <div className="news">
        <label className="news__search">
          <input type="search" placeholder="Введите текст для поиска"></input>
        </label>

        <div className="news__info">
          <p>https:/knife.media/</p>
          <div className="icon-block">
            <span>
              <img src={view}></img>
            </span>
            <span>
              <img src={trash}></img>
            </span>
            <span>
              <p>6</p>
            </span>
            <span>
              <img src={sort}></img>
            </span>
          </div>
        </div>
        <div className="news__block">
          <NewsItem />
          <NewsItem />
        </div>
    </div>
</div>
  );
}
