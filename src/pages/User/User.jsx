import React from "react";
import Header from "../../components/Header/Header";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import ContentOrganizationTabs from "../../components/ContentOrganizationTabs/ContentOrganizationTabs";

export default function admin() {
  return (
    <>
      <Header />
      <main className="user">
        <div className="container">
          <ContentOrganizationTabs />
          <NewsBlock />
        </div>
      </main>
    </>
  );
}
