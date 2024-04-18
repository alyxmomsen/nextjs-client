"use client";

import tailwindTemplates from "@/styles/taliwind-templates";

import axios from "axios";
import { useEffect, useMemo, useReducer, useState } from "react";

interface THeForm {
  title: string;
  body: string;
  date_to_post: string;
}

const reducer = (
  state: THeForm,
  action: { type: string; payload: Partial<THeForm> },
) => ({ ...state, ...action.payload });

export default function AddNewsForm() {
  const date = new Date();

  const [state, dispatchState] = useReducer(reducer, {
    title: "",
    body: "",
    date_to_post: new Date(Date.now()).toISOString(),
  });

  const [brdiv] = useState(
    useMemo(
      () =>
        ((value) => (
          <div>
            {Array(value)
              .fill(0)
              .map((elem) => (
                <br />
              ))}
          </div>
        ))(2),
      [],
    ),
  );

  useEffect(() => {
    console.log({ state });
  }, [state]);

  return (
    <div className={tailwindTemplates.wrapper + " my-9"}>
      <h2 className="text-2xl font-extrabold dark:text-white">ADD NEWS FORM</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const response = postNews(state);
          response.then((state) => {
            console.log(state);
          });
        }}
      >
        <input

          className={tailwindTemplates.inputText + ' mt-9'}
          type="text"
          placeholder="title"
          value={state.title}
          onInput={(e) =>
            dispatchState({
              type: "update",
              payload: { title: e.currentTarget.value },
            })
          }
        />
        <br/ >
        <textarea
          rows={4}
          cols={100}
          className={tailwindTemplates.textArea}
          placeholder="Write your news here..."
          value={state.body}
          onInput={(e) =>
            dispatchState({
              type: "update",
              payload: { body: e.currentTarget.value },
            })
          }
        />
        <br />
        <input
          type="datetime-local"
          placeholder="date"
          onChange={(e) =>
            dispatchState({
              type: "update",
              payload: {
                date_to_post: new Date(e.currentTarget.value).toISOString(),
              },
            })
          }
        />
        <br />
        <button className={tailwindTemplates.button + ' mt-9'} type="submit">POST THE NEWS</button>
      </form>
    </div>
  );
}

async function postNews(data: THeForm) {
  const response = await axios
    .post(
      "http://localhost:3001/api/news",
      { ...data },
      {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      },
    )
    .catch((err) => {
      console.log({ err });
    });

  return response;
}
