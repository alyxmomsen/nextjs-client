"use client";

import { GetNews } from "@/components/news/news";
import axios from "axios";
import Image from "next/image";
import { ReducerState, useReducer, useState } from "react";

interface formDataState {
  name: string;
  password: string;
  email: string;
}

const initState: formDataState = {
  name: "hello",
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

  const [response , setResponse] = useState(false);

  return (
    <div>
      <h1>Registration</h1>
      <div>{response ? <span>ok</span>: null}</div>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmitHandler({...state}).then(response => {
            setResponse(response ? true : false);
            console.log(response);
        });
      }}>
        <input
          onInput={(e) =>
            dispatch({ type: "", payload: { name: e.currentTarget.value } })
          }
          type="text"
          value={state.name}
        />
        <input
          onInput={(e) =>
            dispatch({ type: "", payload: { email: e.currentTarget.value } })
          }
          type="text"
          value={state.email}
        />
        <input
          onInput={(e) =>
            dispatch({ type: "", payload: { password: e.currentTarget.value } })
          }
          type="text"
          value={state.password}
        />
        <input type="submit"/>
      </form>
    </div>
  );
}

async function onSubmitHandler (formdata:formDataState) {

    const data = formdata ;

    const resp0nse = await axios.post('http://www.localhost:3001/api/registration' , {
        username:data.name ,
        email:data.email ,
        password:data.password ,
    }).catch(er => {
        console.log({er});
    });

    return resp0nse ;

}
