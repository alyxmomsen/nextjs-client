"use client";

import React from "react";

import tailwindTemplates from "@/styles/taliwind-templates";

import axios from "axios";
import { useEffect, useMemo, useReducer, useState } from "react";
import MyPosts from "@/app/account/components/my-posts";

interface THeForm {
  file: File | null;
  title: string;
  body: string;
  date_to_post: string;
  if_delayed_publication: boolean;
}

const reducer = (
  state: THeForm,
  action: { type: string; payload: Partial<THeForm> },
) => ({ ...state, ...action.payload });

export default function AddNewsForm() {
  const [state, dispatchState] = useReducer(reducer, {
    title: "",
    body: "",
    date_to_post: new Date().toISOString(),
    file: null,
    if_delayed_publication: false,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadFormActivated, setIsUploadFormActivated] = useState(false);

  useEffect(() => {}, [state.date_to_post]);

  useEffect(() => {
    if (isUploadFormActivated) {
      // setUploadProgress(0);
    }
  }, [isUploadFormActivated]);

  useEffect(() => {
    if (uploadProgress >= 100) {
      dispatchState({
        type: "update",
        payload: {
          body: "",
          date_to_post: "",
          file: null,
          if_delayed_publication: false,
          title: "",
        },
      });
      // setIsUploadFormActivated(false);
    }
  }, [uploadProgress]);

  return (
    <div className={tailwindTemplates.wrapper + " my-9"}>
      <h2 className="text-2xl font-extrabold dark:text-white">ADD NEWS FORM</h2>
      <button
        className={tailwindTemplates.button}
        onClick={() => {
          setIsUploadFormActivated((current) => !current);
        }}
      >
        {isUploadFormActivated ? "roll up".toUpperCase() : "add new post".toUpperCase()}
      </button>
      {isUploadFormActivated && (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const response = postNews(state, setUploadProgress);
            response.then((state) => {
              console.log(state);
            });
          }}
        >
          <input
            onChange={(e) =>
              dispatchState({
                type: "update",
                payload: {
                  file: e.currentTarget.files ? e.currentTarget.files[0] : null,
                },
              })
            }
            type="file"
            accept="image/*"
            name="my-file"
            id="my-file-to-upload"
          />
          <input
            className={tailwindTemplates.inputText + " mt-9"}
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
          <br />
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
            id="dalayed-publication-checkbox"
            onChange={() => {
              dispatchState({
                type: "update",
                payload: {
                  if_delayed_publication: !state.if_delayed_publication,
                },
              });
            }}
            type="checkbox"
            checked={state.if_delayed_publication}
          />
          <span> </span>
          <label htmlFor="dalayed-publication-checkbox">
            dalayed publication
          </label>
          <br />
          {state.if_delayed_publication && (
            <input
              type="datetime-local"
              placeholder="date"
              onChange={(e) => {
                const dateToPost = new Date(
                  e.currentTarget.value,
                ).toISOString();

                dispatchState({
                  type: "update",
                  payload: {
                    date_to_post: dateToPost /* e.currentTarget.value */,
                  },
                });
              }}
            />
          )}

          <br />

          <button className={tailwindTemplates.button + " mt-9"} type="submit">
            POST THE NEWS
          </button>
        </form>
      )}
      <progress value={uploadProgress} />
      <br />
      {uploadProgress >= 100 && (
        <h3>{"the news is published".toUpperCase()}</h3>
      )}
    </div>
  );
}

async function postNews(
  data: THeForm,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
) {
  const formdata = new FormData();
  const file = data.file;
  formdata.append("title", data.title);
  formdata.append("body", data.body);
  formdata.append("date_to_post", data.date_to_post);
  if (file) {
    formdata.append("my--file", file);
  }

  const response = await axios
    .post("http://localhost:3001/api/news", formdata, {
      headers: {
        Authorization: localStorage.getItem("access_token"),
        /* 'Content-Type': 'multipart/form-data' , */
      },
      onUploadProgress: (e) => {
        const progress = e.progress;
        if (progress) {
          setProgress(progress * 100);
        }
      },
    })
    .catch((err) => {
      console.log({ err });
    });

  return response;
}
