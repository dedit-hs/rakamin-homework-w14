import { loginUser, registerUser } from "@/modules/fetch";
import { UserIcon } from "@heroicons/react/20/solid";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    router.push("/dashboard");
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password);
    const loggedUser = await loginUser(email, password);
    Cookies.set("isLoggedIn", true);
    setIsLoggedIn(true);
    const { token } = loggedUser;
    localStorage.setItem("access_token", token);
    Swal.fire({
      title: "Success!",
      text: "User created successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
    router.push("/dashboard");
  };
  return (
    <main className="p-4">
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8 text-slate-100">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
              User Registration
            </h2>
          </div>
          <form
            className="bg-gray-800 rounded-md p-8 space-y-6"
            onSubmit={submitHandler}
          >
            <div className="rounded-md shadow-sm space-y-1">
              <div>
                <label htmlFor="full-name" className="sr-only text-slate-100">
                  Full Name
                </label>
                <div>
                  <input
                    id="full-name"
                    name="name"
                    type="text"
                    required
                    className="p-2 invert-[1] w-full text-gray-900 rounded-md border-none py-1.5 placeholder:text-gray-400"
                    placeholder="Full Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="name" className="sr-only text-slate-100">
                  Name
                </label>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="p-2 invert-[1] w-full text-gray-900 rounded-md border-none py-1.5 placeholder:text-gray-400"
                    placeholder="Email Address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only text-slate-100">
                  Password
                </label>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="p-2 invert-[1] w-full text-gray-900 rounded-md border-none py-1.5 placeholder:text-gray-400"
                    placeholder="Your Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="sr-only text-slate-100"
                >
                  Confirm Password
                </label>
                <div>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    className="p-2 invert-[1] w-full text-gray-900 rounded-md border-none py-1.5 placeholder:text-gray-400"
                    placeholder="Confirm Password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
