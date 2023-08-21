import { NewsArticle } from "@/types";
import { useEffect, useState } from "react";
import Article from "./Article";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Preferences,
  usePreferencesContext,
} from "@/context/PreferencesContext";

const News = () => {
  // Get page from query params
  const router = useRouter();
  const searchParams = useSearchParams();
  let page = Number(searchParams.get("page"));
  // if no query for page, set page to 1
  if (!page) {
    page = 1;
  }

  // Get preferences from context
  const { preferences } = usePreferencesContext() as {
    preferences: Preferences;
  };

  const [news, setNews] = useState([]);

  // Track total pages
  const [totalPages, setTotalPages] = useState(1);
  // Loading states: Loading | Loaded | Failed | InvalidPage
  const [loading, setLoading] = useState<
    "loading" | "loaded" | "failed" | "invalidPage"
  >("loading");

  // Fetch news articles
  useEffect(() => {
    console.log("fetching");

    const query = `language=en&page=${page}&category=${
      preferences?.category ? preferences.category : "general"
    }`;

    fetch(
      `${
        process.env.NEXT_PUBLIC_ENVIRONMENT === "local"
          ? "http://localhost:3000"
          : "https://info-chronicle.vercel.app"
      }/api/news`,
      {
        method: "POST",
        body: JSON.stringify({
          queryString: query,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTotalPages(
          // Max 100 results allowed in developer account
          Math.floor(Math.min(Number(data.totalResults), 100) / 20)
        );
        setNews(data.articles);
        if (data.code === "maximumResultsReached") {
          setLoading("invalidPage");
        } else {
          setLoading("loaded");
        }
      })
      .catch((error) => {
        setLoading("failed");
        console.log("error", error);
      });
  }, [page, preferences, preferences?.category]);

  // Return content depending on loading state
  if (loading === "loading") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Skeleton className="w-full h-84" />
        <Skeleton className="w-full h-84" />
        <Skeleton className="w-full h-84" />
        <Skeleton className="w-full h-84" />
      </div>
    );
  } else if (loading === "invalidPage") {
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
                  <article
                    key={article.title}
                    className="bg-lighter hover:bg-light rounded-lg hover:shadow-lg"
                  >
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
