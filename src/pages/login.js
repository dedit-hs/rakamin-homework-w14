import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { loginUser } from "@/modules/fetch";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const status = Cookies.get("isLoggedIn");
    setIsLoggedIn(status);
  });
  if (isLoggedIn) {
    router.push("/dashboard");
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      Cookies.set("isLoggedIn", true);
      setIsLoggedIn(true);
      const { token } = res;
      localStorage.setItem("access_token", token);
      Swal.fire({
        title: "Success!",
        text: "Login successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="p-4">
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8 text-slate-100">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
              Sign in to your account
            </h2>
          </div>
          <form
            className="bg-gray-800 rounded-xl p-8 space-y-6"
            onSubmit={handleLogin}
          >
            <div className="rounded-md shadow-sm space-y-1">
              <label htmlFor="email" className="sr-only text-slate-100">
                Email Address
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="p-2 invert-[1] w-full text-gray-900 rounded-md border-none py-1.5 placeholder:text-gray-400"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label htmlFor="password" className="sr-only text-slate-100">
                Passsword
              </label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="p-2 invert-[1] w-full text-gray-900 rounded-md border-none py-1.5 placeholder:text-gray-400"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign In
              </button>
            </div>
            <div className="pt-8">
              <div className="text-sm">
                <span>Don&apos;t have account? </span>
                <Link
                  href="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
