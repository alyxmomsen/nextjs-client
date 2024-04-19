"use client";

import React from "react";

import tailwindTemplates from "@/styles/taliwind-templates";

import axios from "axios";
import { useEffect, useMemo, useReducer, useState } from "react";

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
        {/* <button onClick={(e) => {
          e.preventDefault();
          const formdata = new FormData();

          const file = state.file ;

          if(file) {
            formdata.append('my--file' , file) ;
            axios.post('http://localhost:3001/api/testtest' , formdata  , {
              onUploadProgress:(e) => {

                const progress = e.progress ;
                
                console.log(progress ? progress * 100 : null);
              } ,
              headers:{
                Authorization:localStorage.getItem('access_token') ,
              } ,
            }).then(response => {
              console.log({response});
            }).catch(e => {
              console.log({e});
            })
          }


        }}>upload file</button> */}
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
              payload: { if_delayed_publication: !state.if_delayed_publication },
            });
          }}
          type="checkbox"
          checked={state.if_delayed_publication}
        /><span> </span><label htmlFor="dalayed-publication-checkbox">dalayed publication</label><br />
        {
          state.if_delayed_publication && (<input
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
          />)
        }
        
        <br />
        <button className={tailwindTemplates.button + " mt-9"} type="submit">
          POST THE NEWS
        </button>
      </form>
    </div>
  );
}

async function postNews(data: THeForm) {
  const formdata = new FormData();
  const file = data.file;
  if (file) {
    formdata.append("my--file", file);
    formdata.append("title", data.title);
    formdata.append("body", data.body);
    formdata.append("date_to_post", data.date_to_post);
  }

  const response = await axios
    .post("http://localhost:3001/api/news", formdata, {
      headers: {
        Authorization: localStorage.getItem("access_token"),
        /* 'Content-Type': 'multipart/form-data' , */
      },
    })
    .catch((err) => {
      console.log({ err });
    });

  return response;
}
