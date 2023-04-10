import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const status = Cookies.get("isLoggedIn");
    console.log(status, "status");
    setIsLoggedIn(status);
  }, []);
  return (
    <nav className="p-4 border-b-[1px] border-b-gray-600">
      <div className="mx-auto mx-w-7xl p-2">
        <ul className="text-slate-100 flex justify-between">
          <Link href={"/"} className="text-2xl font-bold">
            de-Book
          </Link>
          {isLoggedIn ? (
            <Link href={"/logout"} className="text-2xl font-bold">
              Logout
            </Link>
          ) : (
            <Link href={"/login"} className="text-2xl font-bold">
              Login
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}
