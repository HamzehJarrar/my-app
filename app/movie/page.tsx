import React from "react";
import Header from "@/components/header/header";
import Article from "@/components/articleData/article";
import Footer from "@/components/footer/page";

const ArticlesPage = async () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Article />
      <Footer />
    </div>
  );
};

export default ArticlesPage;
