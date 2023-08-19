/* eslint-disable @next/next/no-img-element */
import { NewsArticle } from "@/types";
import Link from "next/link";
import { Link as LinkIcon, CalendarDays } from "lucide-react";
import { timestampToDate } from "@/lib/utils";

const Article = (article: NewsArticle) => {
  return (
    <Link
      href={article.url}
      target="_blank"
      className="w-full flex flex-col items-center bg-lighter hover:bg-light focus:bg-light px-6 py-8 rounded-lg hover:shadow-lg"
    >
      <img
        src={
          article.urlToImage ? article.urlToImage : `/images/n-logo-border.png`
        }
        alt={article.title}
        className="w-11/12 h-60 object-cover rounded"
      />
      <h2 className="mt-2 mb-3 text-lg font-semibold line-clamp-2">
        {article.title}
      </h2>

      <div className="w-full px-2 flex justify-between text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <LinkIcon size="16" strokeWidth="1" className="inline" />
          {article.source.name}
        </div>
        <div className="flex items-center gap-1">
          <CalendarDays size="16" strokeWidth="1" className="inline" />
          {timestampToDate(article.publishedAt)}
        </div>
      </div>
    </Link>
  );
};

export default Article;
