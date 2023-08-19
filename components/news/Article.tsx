/* eslint-disable @next/next/no-img-element */
import { NewsArticle } from "@/types";

const Article = (article: NewsArticle) => {
  return (
    <article>
      <img
        src={article.urlToImage || `/iamges/n-logo-border.png`}
        alt={article.title}
        className="w-full"
      />
      <h2>{article.title}</h2>
    </article>
  );
};

export default Article;
