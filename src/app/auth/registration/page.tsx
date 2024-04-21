"use client";

import axios from "axios";
import { useReducer, useState } from "react";
import tailwindTemplates from "@/styles/taliwind-templates";

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
  const [statusMsg, setStatusMsg] = useState("");

  return (
    <div className="p-9">
      {statusMsg}
      <h3 className="text-4xl font-extrabold dark:text-white mb-9">
        Registration
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler({ ...state }).then((response) => {
            setStatusMsg(response.data.message);
            setRegistrationStatus(response.status);
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
        <br />
        <button className={tailwindTemplates.button} type="submit">
          REGISTRATION
        </button>
      </form>
    </div>
  );
}

/**
 *
 * @param formdata - payload
 * @returns
 */

async function onSubmitHandler(formdata: formDataState) {
  const data = formdata;

  try {
    const response = await axios.post<{
      status: boolean;
      message: string;
      payload: null | any;
    }>("http://www.localhost:3001/api/registration", {
      username: data.name,
      email: data.email,
      password: data.password,
    });

    const { status, message, payload } = response.data;

    return {
      status,
      data: {
        message,
        payload,
      },
    };
  } catch (err) {
    if (
      axios.isAxiosError<{
        status: boolean;
        message: string;
        payload: null | any;
      }>(err)
    ) {
      const response = err.response;

      if (response) {
        const data = response.data;
        const { status, message, payload } = data;

        return {
          status,
          data: {
            message,
            payload,
          },
        };
      } else {
        return {
          status: false,
          data: {
            message: "unknown response error",
            payload: null,
          },
        };
      }
    } else {
      return {
        status: false,
        data: {
          message: "unknown error",
          payload: null,
        },
      };
    }
  }
}
