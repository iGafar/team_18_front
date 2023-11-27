import React, { useEffect, useState, useMemo } from "react";
import "./NewsBlock.css";
import trash from "../../assets/images/trash.svg";
import NewsItem from "../NewsItem/NewsItem";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../store/slices/newsSlice";

const NewsBlock = () => {
  const dispatch = useDispatch();
  const newsData = useSelector((state) => state.news);
  const { news, status, error } = newsData;

  const [searchValue, setSearchValue] = useState("");
  const [maxNewsOnPage, setMaxNewsOnPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const startIndex = currentPage * maxNewsOnPage;
  const endIndex = startIndex + maxNewsOnPage;

  useEffect(() => {
    setCurrentPage(0);
  }, [searchValue, maxNewsOnPage]);

  const filteredNews = useMemo(() => {
    if (status === "succeeded") {
      return news.filter(
        (el) =>
          el.body.toLowerCase().includes(searchValue.toLowerCase()) ||
          el.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return [];
  }, [news, searchValue, status]);

  const pages = useMemo(() => Math.ceil(filteredNews.length / maxNewsOnPage), [
    filteredNews,
    maxNewsOnPage,
  ]);

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

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  if (status === "loading") {
    return <div className="news__loading">Loading news...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="newsPage">
      <div className="news">
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
        <div className="news__block">
          {filteredNews.slice(startIndex, endIndex).map((el) => (
            <NewsItem key={el.id} title={el.title} body={el.body} />
          ))}
        </div>
      </div>

      <ReactPaginate
        pageCount={pages} // Общее количество страниц
        pageRangeDisplayed={4} // Количество отображаемых страниц внутри пагинации
        marginPagesDisplayed={1} // Количество отображаемых страниц на краях пагинации
        previousLabel={null}
        nextLabel={null}
        breakLabel={"..."}
        onPageChange={handlePageChange}
        containerClassName={"news__paginate"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default NewsBlock;
