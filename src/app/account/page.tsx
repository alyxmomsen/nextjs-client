import { Span } from "next/dist/trace";
import { headers } from "next/headers";
import AccountData from "./account-data";
import { Suspense } from "react";
import AddNewsForm from "@/components/add-news-form";
import tailwindTemplates from "@/styles/taliwind-templates";

export default async function Account() {
  // const authorization = headers().get('authorization')

  return (
    <div className="p-9">
      <h1 className="text-4xl font-extrabold dark:text-white mb-9">Account</h1>
      <AccountData />
      <AddNewsForm />
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
