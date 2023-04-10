import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAuthenticated(true);
    } else {
      router.push("/login");
    }
  }, [localStorage.getItem("access_token")]);

  return isAuthenticated
    ? children
    : Swal.fire({
        title: "Unauthenticated!",
        text: "Please login to access this page.",
        icon: "error",
        confirmButtonText: "OK",
      });
}
