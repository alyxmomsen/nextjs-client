"use client";

import tailwindTemplates from "@/styles/taliwind-templates";
import Link from "next/link";

const routes = [
  {
    id: 0,
    path: "/",
    name: "HOME",
    isProtected: false,
  },
  {
    id: 1,
    path: "/account",
    name: "ACCOUNT",
    isProtected: true,
  },
  {
    id: 2,
    path: "/auth/login",
    name: "LOGIN",
    isProtected: false,
  },
  {
    id: 3,
    path: "/auth/registration",
    name: "REGISTRATION",
    isProtected: false,
  },
];

export default function NavBar() {
  return (
    <div
      className={tailwindTemplates.wrapper + " br-0"}
      style={{ display: "flex", gap: "9px" }}
    >
      {routes
        .filter((elem) => true)
        .map((elem) => (
          <Link href={elem.path} key={elem.id}>
            {elem.name}
          </Link>
        ))}
    </div>
  );
}
