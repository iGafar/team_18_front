import React from "react";
import Header from "../../components/Header/Header";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./User.css"

export default function admin() {
  return (
    <>
      <Header />
      <main className="user">
        <div className="container">
          <Sidebar />
          <NewsBlock />
        </div>
      </main>
    </>
  );
}
