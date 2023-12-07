import React, { useState } from "react";
import "./NewsItem.css";
import chevron from "../../assets/images/chevron.svg";
import eye from "../../assets/images/icon-eye.svg";
import like from "../../assets/images/icon-like.svg";
import coment from "../../assets/images/icon-coment.svg";
import sent from "../../assets/images/icon-sent.svg";

export default function News({
  type,
  el,
  onAddToFavorites,
  onRemoveFromFavorites,
}) {
  const [hidden, setHidden] = useState(false);

  function handleAddToFavorites(el) {
    onAddToFavorites(el);
  }

  function handleRemoveFromFavorites(el) {
    onRemoveFromFavorites(el);
  }

  return (
    <div className={hidden ? "news-item news-item_active" : "news-item"}>
      <div className="date">{el.date}</div>
      <div className="title">
        <a href={el.url} target="_blank" rel="noreferrer">
          {el.title}
        </a>
      </div>

      <div className="social">
        {Number(el.views) !== 0 && (
          <div className="social__item">
            <img src={eye} alt="eye"></img>
            <p>5.4K</p>
          </div>
        )}

        <div className="social__item">
          <img src={like} alt="like"></img>
          <p>{el.like}</p>
        </div>

        <div className="social__item">
          <img src={coment} alt="comment"></img>
          <p>5.4K</p>
        </div>

        <div className="social__item">
          <img src={sent} alt="sent"></img>
          <p>{el.repost}</p>
        </div>

        <div className="arrow" onClick={() => setHidden(!hidden)}>
          <img
            className={hidden ? "arrow-img arrow-active" : "arrow-img"}
            src={chevron}
            alt="chevron"
          ></img>
        </div>
      </div>

      {hidden && (
        <div className="text">
          <p>{el.text}</p>
        </div>
      )}

      {type === "favorite" ? (
        <button
          className="button"
          onClick={() => handleRemoveFromFavorites(el)}
        >
          Удалить из избранного
        </button>
      ) : (
        <button className="button" onClick={() => handleAddToFavorites(el)}>
          {el.is_favourite ? "В избранном" : "В избранное"}
        </button>
      )}
    </div>
  );
}
