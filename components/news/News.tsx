import { NewsArticle } from "@/types";
import { useEffect, useState } from "react";
import Article from "./Article";
import { Skeleton } from "../ui/skeleton";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState<"loading" | "loaded" | "failed">(
    "loading"
  );
  useEffect(() => {
    const APIKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    fetch(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${APIKey}
    `)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNews(data.articles);
        setLoading("loaded");
      })
      .catch((error) => {
        setLoading("failed");
        console.log(error);
      });
  }, []);

  if (loading === "loading") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Skeleton className="w-full h-84" />
        <Skeleton className="w-full h-84" />
        <Skeleton className="w-full h-84" />
        <Skeleton className="w-full h-84" />
      </div>
    );
  } else if (loading === "loaded") {
    return (
      <div className="py-4">
        {news && (
          <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-10">
            {news.map((article: NewsArticle) => {
              return (
                <article key={article.title}>
                  <Article {...article} />
                </article>
              );
            })}
          </div>
        )}
      </div>
    );
  } else {
    return <>Something went wrong! Please try again.</>;
  }
};

export default News;
