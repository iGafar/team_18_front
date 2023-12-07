import React from "react";
import "./NewsHead.css";
import Select from "react-select";
import trash from "../../assets/images/trash.svg";

const optionsSort = [
  { value: "date", label: "Дате" },
  { value: "comments", label: "Комментариям" },
  { value: "reposts", label: "Репостам" },
  { value: "likes", label: "Лайкам" },
  { value: "views", label: "Просмотрам" },
];

const optionsNumber = [
  { value: "3", label: "3" },
  { value: "6", label: "6" },
  { value: "9", label: "9" },
  { value: "12", label: "12" },
  { value: "15", label: "15" },
  { value: "18", label: "18" },
];

export default function NewsHead({
  setMaxNewsOnPage,
  searchValue,
  setSearchValue,
}) {
  return (
    <>
      <label className="news__search">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="search"
          placeholder="Введите текст для поиска"
        ></input>
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
            onChange={(option) => setMaxNewsOnPage(Number(option.value))}
          />
          <span>
            <img src={trash} alt="Trash Icon"></img>
          </span>
        </div>
      </div>
    </>
  );
}
