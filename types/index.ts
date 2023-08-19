export interface NewsArticle {
  author: string;
  content: null | string;
  description: null | string;
  publishedAt: string;
  source: { id: null | string; name: null | string };
  title: string;
  url: string;
  urlToImage: null | string;
}
