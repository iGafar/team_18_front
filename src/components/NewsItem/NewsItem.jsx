import React, { useState } from "react";
import "./NewsItem.css";
import chevron from "../../assets/images/chevron.svg";
import eye from "../../assets/images/icon-eye.svg";
import like from "../../assets/images/icon-like.svg";
import coment from "../../assets/images/icon-coment.svg";
import sent from "../../assets/images/icon-sent.svg";
export default function News(props) {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="news-item">
      <div className="date">13.11.2023 10-00</div>
      <div className="title">{props.title}</div>

      <div className="social">
        <div className="social__item">
          <img src={eye}></img>
          <p>5.4K</p>
        </div>
        <div className="social__item">
          <img src={like}></img>
          <p>5.4K</p>
        </div>
        <div className="social__item">
          <img src={coment}></img>
          <p>5.4K</p>
        </div>
        <div className="social__item">
          <img src={sent}></img>
          <p>5.4K</p>
        </div>

        <div className="arrow" onClick={() => setHidden(!hidden)}>
          <img
            className={hidden ? "arrow-img arrow-active" : "arrow-img"}
            src={chevron}
          ></img>
        </div>
      </div>

      {hidden && (
        <div className="text">
          <p>{props.body}</p>
        </div>
      )}

      <button className="button">в избранное</button>
    </div>
  );
}
