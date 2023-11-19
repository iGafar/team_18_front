import React from "react";
import "./NewsBlock.css";
import view from "../../assets/images/view-card.svg";
import sort from "../../assets/images/sort.svg";
import trash from "../../assets/images/trash.svg";
import NewsItem from "../NewsItem/NewsItem";
import Select from "react-select";

export default function NewsBlock() {
  const optionsSort = [
    { value: "date", label: "Дате" },
    { value: "comments", label: "Комментариям" },
    { value: "reposts", label: "Репостам" },
    { value: "likes", label: "Лайкам" },
    { value: "views", label: "Просмотрам" },
    { value: "all", label: "Все параметры" },
  ];

  const optionsNumber = [
    { value: "3", label: "3" },
    { value: "6", label: "6" },
    { value: "9", label: "9" },
    { value: "12", label: "12" },
    { value: "15", label: "15" },
  ];

  return (
    <div className="newsPage">
      <div className="news">
        <label className="news__search">
          <input type="search" placeholder="Введите текст для поиска"></input>
        </label>

        <div className="news__info">
          <Select
            className="news-select-container"
            classNamePrefix="news-select"
            placeholder="Сортировать по..."
            options={optionsSort}
          />
          <div className="icon-block">
            <span>Новостей на странице</span>
            <Select
              className="news-number-container"
              classNamePrefix="news-number"
              placeholder="3"
              options={optionsNumber}
							defaultValue={optionsNumber[0]}
            />
            <span>
              <img src={trash}></img>
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
