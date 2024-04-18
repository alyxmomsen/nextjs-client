import tailwindTemplates from "@/styles/taliwind-templates";
import axios from "axios";
import { useEffect, useState } from "react";

const newsTW =
  "max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700";
const ntwheader =
  "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
export default async function News() {
  const data = await getNews();

  console.log({ data });

  return (
    <div>
      <h2 className="text-5xl font-extrabold dark:text-white">
        NEWS ONLY YOURTH
      </h2>
      <section className={tailwindTemplates.wrapper + " my-9"}>
        {data.status &&
          data.payload.map((elem) => (
            <>
              <div className={newsTW}>
                <h3>author: {elem.authorUserName}</h3>
                <h5 className={ntwheader}>{elem.title}</h5>
                <p>{elem.body}</p>
              </div>
              <br />
            </>
          ))}
      </section>
    </div>
  );
}

async function getNews() {
  const response = await fetch("http://localhost:3001/api/news", {
    next: {
      revalidate: 60,
    },
  });

  return (await response.json()) as {
    status: boolean;
    payload: { title: string; body: string , authorUserName:string }[];
  };
}
