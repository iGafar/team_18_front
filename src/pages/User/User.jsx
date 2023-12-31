import React, { useState } from "react";
import Header from "../../components/Header/Header";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./User.css";
import { useDocumentTitle } from "../../hooks/setDocumentTitle";
import FavoritesNews from "../../components/FavoritesNews/FavoritesNews";

export default function User() {
  const [activeTab, setActiveTab] = useState("search");

  useDocumentTitle("Поиск новостей");
  return (
    <>
      <Header />
      <main className="user">
        <div className="container">
          <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
          {
            {
              search: <NewsBlock />,
              favourite: <FavoritesNews />,
            }[activeTab]
          }
        </div>
      </main>
    </>
  );
}
