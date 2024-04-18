"use client";

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
    <div>
      <h2>ADD NEWS FORM</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const response = postNews(state);
        response.then(state => {
            console.log(state);
        });
      }}>
        <input value={''} type="submit" /><br/><br/>
        <input
          type="string"
          placeholder="title"
          value={state.title}
          onInput={(e) =>
            dispatchState({
              type: "update",
              payload: { title: e.currentTarget.value },
            })
          }
        />
        {brdiv}
        <input
          type="string"
          placeholder="body"
          value={state.body}
          onInput={(e) =>
            dispatchState({
              type: "update",
              payload: { body: e.currentTarget.value },
            })
          }
        />
        {brdiv}
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
      </form>
    </div>
  );
}

async function postNews (data:THeForm) {

    const response =await axios.post('http://localhost:3001/api/news' , {...data} , {
        headers:{
            Authorization:localStorage.getItem('access_token') ,
        }
    }).catch(err => {
        console.log({err})
    });

    return response ;

}
