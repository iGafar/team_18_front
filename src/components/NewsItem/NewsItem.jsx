import React, { useState } from "react";
import "./NewsItem.css";
import chevron from "../../assets/images/chevron.svg";
import eye from "../../assets/images/icon-eye.svg";
import like from "../../assets/images/icon-like.svg";
import coment from "../../assets/images/icon-coment.svg";
import sent from "../../assets/images/icon-sent.svg";
export default function News() {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="news-item">
      <div className="date">13.11.2023 10-00</div>
      <div className="title">
        В Новосибирской области бобры затопили дорогу и оставили без света два
        села
      </div>

      <div className="arrow" onClick={() => setHidden(!hidden)}>
        <img src={chevron}></img>
      </div>
      {hidden && (
        <div className="text">
          <p>
            В Новосибирской области бобры построили плотины на реке Грязнушке и
            поменяли ее русло. В результате вода вышла из берегов, затопила
            дорогу и подмыла опору линии электропередачи. Два села остались без
            света на несколько часов. Сотрудники дорожно-строительного
            управления попытались разрушить препятствия в реке, однако их
            техника также увязла в трясине. «Здесь не подступиться. Песчаный
            грунт, и набралось много воды, возможно, даже плывуны были, потому
            что экскаватор моментально ушел, вытаскивали болотоходом и таким же
            экскаватором», — рассказал начальник участка. Сейчас власти района
            отчитались о разрушении бобровых дамб и отведении воды. Они
            разрабатывают план мероприятий по предотвращению подобных ситуаций и
            наблюдают за грызунами.
          </p>
        </div>
      )}

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
      </div>

      <button className="button">в избранное</button>
    </div>
  );
}
