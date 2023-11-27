import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { categoriesURL } from "@/constants/urls";
import Link from "next/link";

export default function ExploreView({ categories }) {
  return (
    <>
      <div className="ml-6 flex flex-col justify-center gap-4">
        <h1 className="ml-6 text-5xl font-bold mb-4">
          Explora tu género favorito
        </h1>
        <div className="text-black w-11/12 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {categories.length ? (
            categories.map((category, index) => (
              <Link
                href={{
                  pathname: categoriesURL,
                  query: { category: category.name },
                }}
                key={index}
              >
                <div className="bg-primary p-8 font-bold text-xl flex justify-center items-center rounded-md transition-transform hover:scale-105 hover:bg-66D36E">
                  {category.name}
                </div>
              </Link>
            ))
          ) : (
            <div className="max-h-screen max-w-screen flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
