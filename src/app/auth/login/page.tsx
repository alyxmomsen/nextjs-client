"use client";

import axios from "axios";
import Image from "next/image";
import { ReducerState, useEffect, useReducer, useState } from "react";

interface formDataState {
  password: string;
  email: string;
}

const initState: formDataState = {
  password: "",
  email: "",
};

export default function Registration() {
  const [state, dispatch] = useReducer(
    (
      state: formDataState,
      action: { type: string; payload: Partial<formDataState> },
    ) => ({ ...state, ...action.payload }),
    initState,
  );

  const [response, setResponse] = useState(false);

  useEffect(() => {
    console.log(localStorage);
  }, [response]);

  return (
    <div>
      <h1>LOGIN FORM</h1>
      <div>
        {response ? (
          <button
            onClick={() => {
              localStorage.clear();
              setResponse(false);
            }}
          >
            LOGOUT
          </button>
        ) : null}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler({ ...state }).then((response) => {
            if (response) {
              localStorage.setItem("access_token", response.data.payload.token);
            }

            setResponse(response ? true : false);
          });
        }}
      >
        <input
          placeholder="e-mail"
          onInput={(e) =>
            dispatch({ type: "", payload: { email: e.currentTarget.value } })
          }
          type="text"
          value={state.email}
        />
        <br/><br/>
        <input
          placeholder="password"
          onInput={(e) =>
            dispatch({ type: "", payload: { password: e.currentTarget.value } })
          }
          type="text"
          value={state.password}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

async function onSubmitHandler(formdata: formDataState) {
  const data = formdata;

  const resp0nse = await axios
    .post("http://www.localhost:3001/api/login", {
      email: data.email,
      password: data.password,
    })
    .catch((er) => {
      console.log({ er });
    });

  return resp0nse;
}
