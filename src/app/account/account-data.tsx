"use client";

import axios from "axios";
import { constrainedMemory } from "process";
import { useEffect, useLayoutEffect, useState } from "react";
import Router from "next/router";
import { useRouter } from "next/navigation";

interface UserData {
  username: string;
  email: string;
}

export default function AccountData() {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUD] = useState<UserData | null>(null);

  useEffect(() => {
    if (token && token.length) {
      getAccountData(token)
        .then((data) => {
          // localStorage.clear();

          if (data) {
            setIsAuth(true);
            setUD({ ...data });

            console.log(data);
          }
        })
        .catch((err) => {
          alert();
        });
    }
  }, [token]);

  useLayoutEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && token.length) {
      setToken(token);
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <header>
        Hello ,{" "}
        <span style={{ fontWeight: "bold", color: "Highlight" }}>
          {userData?.username}
        </span>{" "}
        you are
        {!isAuth ? <span> NOT </span> : " "}
        AUTHRIZED
        {isAuth ? (
          <button
            onClick={() => {
              localStorage.clear();
              router.push("/");
            }}
          >
            LogOut
          </button>
        ) : null}
      </header>
      <section>
        {isAuth ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            <h2>user name:</h2>
            <span style={{ fontWeight: "bold", color: "Highlight" }}>
              {userData?.username}
            </span>
            <h2>email</h2>
            <span style={{ fontWeight: "bold", color: "Highlight" }}>
              {userData?.email}
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </section>
      <footer></footer>
    </div>
  );
}

async function getAccountData(token: string) {
  try {
    const response = await axios.get<{
      payload: { username: string; email: string };
    }>("http://localhost:3001/api/account", {
      headers: {
        Authorization: token,
        "Content-Type": "application/JSON",
      },
    });

    console.log({ payload: "response.data.payload" });
    const data = response.data.payload;

    return data;
  } catch (err) {
    console.log({ err });
    return null;
  }
}
