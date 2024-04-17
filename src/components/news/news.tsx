"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const token =
  "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NjFmOGE4ODRjMTk1MjVlZThiMDc0NGQiLCJpYXQiOjE3MTMzNDk1NjB9.GPKsqYsLSXJf_DsnmrL5yWDs1nIU_xGz8EDs_4pi7sc";

export function GetNews() {
  const state = useState(0);

  useEffect(() => {
    axiosRun().then((res) => {
      console.log(res);
    });
  }, []);

  return <div>news</div>;
}

async function axiosRun() {
  console.log("axios run");

  const response = await axios
    .get("http://www.localhost:3001/api/account", {
      headers: {
        Authorization: token,
      },
    })
    .catch((err) => {
      console.error(err);
    });

  return response;
}
