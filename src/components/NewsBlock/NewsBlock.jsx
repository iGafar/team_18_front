import React, { useEffect, useRef, useState } from "react";
import "./NewsBlock.css";
import trash from "../../assets/images/trash.svg";
import NewsItem from "../NewsItem/NewsItem";
import Select from "react-select";
import news from "../../assets/news.json";

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
    { value: "18", label: "18" },
  ];

  const [maxNewsOnPage, setMaxNewsOnPage] = useState(3);
  const [filteredNews, setFilteredNews] = useState(news);
  const [pages, setPages] = useState(Math.floor(news.length / maxNewsOnPage));

  useEffect(() => {
    setFilteredNews(news.slice(0, maxNewsOnPage));
    setPages(Math.floor(news.length / maxNewsOnPage));
  }, [maxNewsOnPage]);

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
              onChange={(option) => setMaxNewsOnPage(option.value)}
            />
            <span>
              <img src={trash}></img>
            </span>
          </div>
        </div>
        <div className="news__block">
          {filteredNews.map((el) => (
            <NewsItem key={el.id} title={el.title} body={el.body} />
          ))}
        </div>
      </div>

      <ul className="news__pages">
        {[...Array(5)].map((el, i) => (
          <li key={i}>{i + 1}</li>
        ))}
				<li>...</li>
				<li>{pages}</li>
      </ul>
    </div>
  );
}
