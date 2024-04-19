"use client";

import axios from "axios";
import Image from "next/image";
import { ReducerState, useReducer, useState } from "react";

const inputClassName =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

interface formDataState {
  name: string;
  password: string;
  email: string;
}

const initState: formDataState = {
  name: "",
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

  const [registrationStatus, setRegistrationStatus] = useState(false);

  return (
    <div className="p-9">
      <h3 className="text-4xl font-extrabold dark:text-white mb-9">
        Registration
      </h3>
      <div>{registrationStatus ? <span>ok</span> : null}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler({ ...state }).then((response) => {

            const {status , message} = response?.data ;

            setRegistrationStatus(status ? true : false);
            console.log({status , message});
          });
        }}
      >
        <input
          className={inputClassName}
          placeholder="NAME"
          onInput={(e) =>
            dispatch({ type: "", payload: { name: e.currentTarget.value } })
          }
          type="text"
          value={state.name}
        />
        <br />
        <input
          className={inputClassName}
          placeholder="EMAIL"
          onInput={(e) =>
            dispatch({ type: "", payload: { email: e.currentTarget.value } })
          }
          type="text"
          value={state.email}
        />
        <br />
        <input
          className={inputClassName}
          placeholder="PASSWORD"
          onInput={(e) =>
            dispatch({ type: "", payload: { password: e.currentTarget.value } })
          }
          type="password"
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
    .post("http://www.localhost:3001/api/registration", {
      username: data.name,
      email: data.email,
      password: data.password,
    })
    .catch((er) => {
      console.log({ er });
    });

  return resp0nse;
}
