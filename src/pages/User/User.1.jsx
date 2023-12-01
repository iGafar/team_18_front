import React from "react";
import Header from "../../components/Header/Header";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDocumentTitle } from "../../hooks/setDocumentTitle";

export default function User() {
  useDocumentTitle("Поиск новостей");
  return (
    <>
      <Header />
      <main className="user">
        <div className="container">
          <Sidebar />
          {}switch('') {}
          case '': return <NewsBlock />
          default: return <NewsBlock />
          }}
          <NewsBlock />
        </div>
      </main>
    </>
  );
}
