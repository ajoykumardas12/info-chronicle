import { NewsArticle } from "@/types";
import { useEffect, useState } from "react";
import Article from "./Article";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const News = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let page = Number(searchParams.get("page"));

  if (!page) {
    page = 1;
  }

  const [news, setNews] = useState([]);

  // Track total and current pages
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<
    "loading" | "loaded" | "failed" | "tooFar"
  >("loading");
  useEffect(() => {
    const APIKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    fetch(`https://newsapi.org/v2/top-headlines?language=en&pageSize=20&page=${page}&apiKey=${APIKey}
    `)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTotalPages(Math.floor(data.totalResults / 20));
        setNews(data.articles);
        if (data.code === "maximumResultsReached") {
          setLoading("tooFar");
        } else {
          setLoading("loaded");
        }
      })
      .catch((error) => {
        setLoading("failed");
        console.log("error", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  } else if (loading === "tooFar") {
    return (
      <div className="text-center my-20">
        <div className="mb-4">You&apos;ve wandered off too far from home.</div>
        <Link href="/" className="link text-lg font-semibold">
          Back to Home
        </Link>
      </div>
    );
  } else if (loading === "loaded") {
    return (
      <div className="py-4">
        {news && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-10">
              {news.map((article: NewsArticle) => {
                return (
                  <article key={article.title}>
                    <Article {...article} />
                  </article>
                );
              })}
            </div>
            <div className="w-full flex justify-center mt-10">
              <div className="flex gap-4">
                {Array.from(Array(totalPages).keys()).map((pageNumber) => {
                  return (
                    <Button
                      key={pageNumber}
                      variant={
                        page === pageNumber + 1 ? "default" : "secondary"
                      }
                      onClick={() => {
                        router.push(`?page=${pageNumber + 1}`);
                      }}
                    >
                      {pageNumber + 1}
                    </Button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return <>Something went wrong! Please try again.</>;
  }
};

export default News;
