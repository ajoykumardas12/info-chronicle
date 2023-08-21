import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  const APIKey = process.env.NEWS_API_KEY;

  try {
    const queryString = body.queryString;
    console.log(
      `https://newsapi.org/v2/top-headlines?${queryString}&pageSize=20&apiKey=${APIKey}`
    );

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?${queryString}&pageSize=20&apiKey=${APIKey}`
    );
    const data = await response.json();
    console.log(data);

    return NextResponse.json({
      status: data.status,
      totalResults: data.totalResults,
      code: data.code,
      articles: data.articles,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400, error: error });
  }
};
