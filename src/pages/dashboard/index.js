import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import prisma from "../../../lib/prisma";

export default function Dashboard(props) {
  const router = useRouter();
  const status = false || Cookies.get("isLoggedIn");
  useEffect(() => {
    if (!status) {
      Swal.fire({
        title: "Anauthenticated!",
        text: "Please login to access this page.",
        icon: "error",
        confirmButtonText: "OK",
      });
      router.push("/login");
    }
  });

  return (
    <main>
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="text-slate-100 pb-4 text-2xl">Dashboard</h1>
          <button className="bg-blue-800 p-2 mb-4 rounded-lg">create</button>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-slate-100">
              <thead className="text-xs text-slate-100 uppercase bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Publisher
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Year
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pages
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {props?.books?.map((book) => (
                  <tr className="border-b bg-gray-800" key={book.id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap"
                    >
                      {book.title}
                    </th>
                    <td className="px-6 py-4">{book.author}</td>
                    <td className="px-6 py-4">{book.publisher}</td>
                    <td className="px-6 py-4">{book.year}</td>
                    <td className="px-6 py-4">{book.pages}</td>
                    <td className="px-6 py-4">{book.image}</td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 hover:underline pl-2"
                      >
                        Hapus
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const books = await prisma.book.findMany({});
  return {
    props: { books },
  };
}
