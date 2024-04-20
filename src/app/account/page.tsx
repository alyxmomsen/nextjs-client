'use client'

import { Span } from "next/dist/trace";
import { headers } from "next/headers";
import AccountData from "./components/account-data/account-data";
import { Dispatch, SetStateAction, Suspense, useMemo, useReducer, useState } from "react";
import AddNewsForm from "@/app/account/components/add-news-form";
import tailwindTemplates from "@/styles/taliwind-templates";
import MyPosts from "./components/my-posts";
import style from "./styles/styles.module.css"

type Tab = "INFO"|"ADD-NEWS"|"MY-POSTS" ;


const menuItems:{isCurrent:boolean , name:string , index:Tab}[] = [
  {
    isCurrent:true ,
    name:'info' ,
    index:'INFO' ,
  } ,
  {
    isCurrent:true ,
    name:'add news' ,
    index:'ADD-NEWS' ,
  } ,
  {
    isCurrent:true ,
    name:'my posts' ,
    index:'MY-POSTS' ,
  } ,
]



const custom_router = (tab:Tab) => {

  switch (tab) {
    case "INFO":
      return <AccountData />
    case "ADD-NEWS":
      return <AddNewsForm />
    case "MY-POSTS":
      return <MyPosts />
  }
} 

export default function Account() {
  // const authorization = headers().get('authorization')

  const [currentTab , setCurrentTab] = useState<Tab>("INFO");
  const menu = useMemo(() => updateMenu(menuItems , currentTab , setCurrentTab) , [currentTab]) ;
  
  return (
    <div className={tailwindTemplates.wrapper}>
      <div className={style.menuWrapper}>
        {
          menu.map(elem => elem)
        }
      </div>
      <h1 className="text-4xl font-extrabold dark:text-white mb-9">Account</h1>
      {
        custom_router(currentTab)
      }
    </div>
  );
}

async function getUserData() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NjFmZTA4YzU3MjcxMzU0MjYyNWQyNWEiLCJpYXQiOjE3MTMzNjUxODN9.b7gufw1lANMSOYHCUiOpN1kQwg9sVvas2t_-bVGuwec";

  const response = await fetch("http://localhost:3001/api/account", {
    method: "get",
    next: { revalidate: 10 },
    headers: {
      authorization: token,
    },
  });

  return await response.json();
}

function updateMenu (menuItems:{isCurrent:boolean , name:string , index:Tab}[] ,current:Tab , dispatch:Dispatch<SetStateAction<Tab>>) {
  console.log('update menu');
  return menuItems.map(elem => <button key={elem.index} className={tailwindTemplates.button} onClick={() => {dispatch(elem.index)}}>{elem.name}</button>) ;
} 