"use client";

import { title } from "process";
import { useEffect, useReducer } from "react";

interface NewsEntity {
  id: string;
  postId: string;
  title: string;
  body: string;
}

export default function News() {
  const [news, newsDispatch] = useReducer<
    (
      state: NewsEntity[],
      action: { type: string; payload: Partial<NewsEntity> },
    ) => NewsEntity[]
  >((state, action) => [...state], []);

  useEffect(() => {});

  return (
    <div>
      <h2>NEWS</h2>
      <section>news list</section>
    </div>
  );
}
