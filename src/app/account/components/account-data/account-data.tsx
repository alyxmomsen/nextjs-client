"use client";

const buttoTailWindStyle =
  "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800";

import axios from "axios";
import { constrainedMemory } from "process";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import Router from "next/router";
import { useRouter } from "next/navigation";
import tailwindTemplates from "@/styles/taliwind-templates";
import AddNewsForm from "@/app/account/components/add-news-form";
import MyPosts from "../my-posts";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface UserData {
  username: string;
  email: string;
}

// const localContext = createContext({});

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
    <div className={tailwindTemplates.wrapper}>
      <header>
        <section>
          {userData && (
            <Greating isAuth={isAuth} userData={userData} router={router} />
          )}
        </section>
      </header>
      <section>
        <section>
          {isAuth ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "9px" }}
            >
              <label htmlFor="user-name-readonly-input">USERNAME</label>
              <input
                id="user-name-readonly-input"
                className={tailwindTemplates.inputText + " w-min"}
                type="text"
                readOnly
                value={userData?.username}
              />
              <label htmlFor="email-readonly-input">EMAIL</label>
              <input
                id="email-readonly-input"
                className={tailwindTemplates.inputText + " w-min"}
                type="text"
                readOnly
                value={userData?.email}
              />
            </div>
          ) : (
            <div></div>
          )}
        </section>
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

function Greating({
  isAuth,
  userData,
  router,
}: {
  isAuth: boolean;
  userData: UserData;
  router: AppRouterInstance;
}) {
  // const router = useRouter();
  return (
    <section>
      Hello ,{" "}
      <span style={{ fontWeight: "bold", color: "Highlight" }}>
        {userData?.username}
      </span>{" "}
      you are
      {!isAuth ? <span> NOT </span> : " "}
      AUTHRIZED<span> </span>
      {isAuth ? (
        <button
          className={tailwindTemplates.button}
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
        >
          LogOut
        </button>
      ) : null}
    </section>
  );
}
