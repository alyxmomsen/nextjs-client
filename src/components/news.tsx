"use client";

import axios from "axios";
import { title } from "process";
import { Suspense, useEffect, useReducer } from "react";

interface NewsEntity {
  id: number;
  title: string;
  body: string;
}

export default function News() {
  const [news, newsDispatch] = useReducer<
    (
      state: NewsEntity[],
      action: { type: string; payload: NewsEntity[] | number },
    ) => NewsEntity[]
  >((state, action) => {
    const payload = action.payload;
    switch (action.type) {
      case "update":
        if (typeof payload === "number") {
          return state;
        } else {
          return [...payload];
        }
      case "removeByID":
        return typeof payload === "number"
          ? [...state.filter((element) => element.id !== payload)]
          : state;
      default:
        return state;
    }
  }, []);

  useEffect(() => {
    getNews<{ userId: number; id: number; title: string; body: string }[]>(
      "get",
      "https://jsonplaceholder.typicode.com/posts/",
    ).then((data) => {
      if (!data) return;

      newsDispatch({
        type: "update",
        payload: data.map((elem) => ({
          id: elem.id,
          body: elem.body,
          title: elem.title,
        })),
      });
    });
  }, []);

  return (
    <div>
      <h2>NEWS</h2>
      <section>
        {news.map((elem, i) => (
          <div
            onClick={(e) => {
              ((value: number) => {
                newsDispatch({ type: "removeByID", payload: value });
              })(elem.id);
            }}
            key={/* elem.id */ i}
          >
            <br />
            <br />
            <h2>{elem.title}</h2>
            <br />
            <br />
            <p>{elem.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

async function getNews<T>(method: "get" | "post", url: string) {
  const response = await axios["get"]<T>(url, {} /* , {} */)
    .catch(() => {})
    .finally(() => {});
  console.log(response?.data);
  return response?.data;
}
