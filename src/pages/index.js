import Link from "next/link";
import prisma from "../../lib/prisma";

export default function Home(props) {
  return (
    <main>
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="text-2xl text-slate-100 pb-4">List Books</h1>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {props?.books?.map((book) => (
              <Link
                href="#"
                className="group bg-gray-700 rounded-lg p-4"
                key={book.id}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  {/* <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-75"> */}
                </div>
                <h3 className="mt-4 text-lg font-medium">{book.title}</h3>
                <p className="mt-1 text-sm">{book.author}</p>
              </Link>
            ))}
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
