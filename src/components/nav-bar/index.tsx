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
    <div style={{ display: "flex", gap: "9px" }}>
      {routes.map((elem) => (
        <Link href={elem.path} key={elem.id}>
          {elem.name}
        </Link>
      ))}
    </div>
  );
}
