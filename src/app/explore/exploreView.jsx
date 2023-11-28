import Divider from "@/components/Divider/Divider";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { categoriesURL } from "@/constants/urls";
import Link from "next/link";

export default function ExploreView({ categories }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold my-4 px-6 text-center">
          Explora tu género favorito
        </h1>
        <Divider color="none" />

        <div className="text-primary-content w-11/12 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {categories.length ? (
            categories.map((category, index) => (
              <Link
                href={{
                  pathname: categoriesURL,
                  query: { category: category.name },
                }}
                key={index}
              >
                <div className="bg-primary p-8 font-bold text-xl flex justify-center items-center rounded-md transition-transform hover:scale-105 hover:bg-[#66D36E]">
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
