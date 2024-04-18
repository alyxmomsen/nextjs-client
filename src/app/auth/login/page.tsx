"use client";

import tailwindTemplates from "@/styles/taliwind-templates";
import axios from "axios";
import Image from "next/image";
import { ReducerState, useEffect, useReducer, useState } from "react";

const inputClassName =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
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
    <div className="p-9">
      <h2 className="text-4xl font-extrabold dark:text-white mb-9">
        LOGIN FORM
      </h2>
      <div>
        {response ? (
          <button
            className={tailwindTemplates.button}
            onClick={() => {
              localStorage.clear();
              setResponse(false);
            }}
          >
            LOGOUT
          </button>
        ) : null}
      </div>
      {!response && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitHandler({ ...state }).then((response) => {
              if (response) {
                localStorage.setItem(
                  "access_token",
                  response.data.payload.token,
                );
              }

              setResponse(response ? true : false);
            });
          }}
        >
          <input
            className={tailwindTemplates.inputText + " my-9"}
            placeholder="e-mail"
            onInput={(e) =>
              dispatch({ type: "", payload: { email: e.currentTarget.value } })
            }
            type="text"
            value={state.email}
          />
          <input
            className={tailwindTemplates.inputText + " my-9"}
            placeholder="password"
            onInput={(e) =>
              dispatch({
                type: "",
                payload: { password: e.currentTarget.value },
              })
            }
            type="text"
            value={state.password}
          />
          <br />
          <button
            className={tailwindTemplates.button}
            value={"GO"}
            type="submit"
          >
            LOGIN
          </button>
        </form>
      )}
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
