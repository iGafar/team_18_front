import React, { useEffect, useState, useMemo } from "react";
import "./NewsBlock.css";
import NewsItem from "../NewsItem/NewsItem";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../store/slices/newsSlice";
import { addToFavorites } from "../../store/slices/favoritesSlice";
import NewsHead from "../NewsHead/NewsHead";

const NewsBlock = () => {
  const dispatch = useDispatch();
  const newsData = useSelector((state) => state.news);
  const currentUser = useSelector((state) => state.currentUser);
  const { news, status, error } = newsData;

  const [filterArray, setFilterArray] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [maxNewsOnPage, setMaxNewsOnPage] = useState(3);
  const [searchValue, setSearchValue] = useState("");

  let [blockHeight, setBlockHeight] = useState(400);

  window.addEventListener("resize", () => {
    setBlockHeight(
      document.querySelector(".news__block-container").clientHeight
    );
  });

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const startIndex = currentPage * maxNewsOnPage;
  const endIndex = startIndex + maxNewsOnPage;

  useEffect(() => {
    setCurrentPage(0);
  }, [searchValue, maxNewsOnPage]);

  const handleAddToFavorites = (newsItem) => {
    dispatch(addToFavorites(newsItem));
  };

  useEffect(() => {
    if (Object.keys(currentUser.filterSettings).length) {
      const siteMap = currentUser.filterSettings.sites.reduce(
        (map, site) => ({ ...map, [site.id]: site.is_active }), {}
      );
      const tags = currentUser.filterSettings.tags.filter((tag) =>
        tag.site_list.some((tagSite) => siteMap[tagSite.id])
      );
      const tagsMap = tags.reduce(
        (map, tag) => ({ ...map, [tag.id]: tag.is_active }), {}
      );
      setFilterArray(news.filter((el) => siteMap[el.site_id] && el.category_list.some(tag => tagsMap[tag.id])));
    }
  }, [currentUser, news]);

  const filteredNews = useMemo(() => {
    if (status === "succeeded") {
      return filterArray.filter(
        (el) =>
          el.text.toLowerCase().includes(searchValue.toLowerCase()) ||
          el.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return [];
  }, [filterArray, searchValue, status]);

  const pages = useMemo(
    () => Math.ceil(filteredNews.length / maxNewsOnPage),
    [filteredNews, maxNewsOnPage]
  );

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
        <NewsHead
          setMaxNewsOnPage={setMaxNewsOnPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className="news__block-container">
          <div
            className="news__block"
            style={{ maxHeight: blockHeight + "px" }}
          >
            {filteredNews.slice(startIndex, endIndex).map((el) => (
              <NewsItem
                key={el.id}
                el={el}
                onAddToFavorites={() => handleAddToFavorites(el)}
              />
            ))}
          </div>
        </div>
      </div>

      <ReactPaginate
        pageCount={pages}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
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
