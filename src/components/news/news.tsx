import axios from "axios";
import { useEffect, useState } from "react";

export default async function News() {
  const data = await getNews();

  console.log({ data });

  return (
    <div>
      <h2>NEWS ONLY YOURE</h2>
      <section>
        content:
        {data.status &&
          data.payload.map((elem) => (
            <div>
              <div>{elem.title}</div>
              <div>{elem.body}</div>
            </div>
          ))}
      </section>
    </div>
  );
}

async function getNews() {
  const response = await fetch("http://localhost:3001/api/news", {
    next: {
      revalidate: 10,
    },
  });

  return (await response.json()) as {
    status: boolean;
    payload: { title: string; body: string }[];
  };
}
