import Link from "next/link";

export default function ExploreView({ categories }) {
    return (
        <>
            <div className="ml-6 flex flex-col justify-center gap-4">
                <h1 className="ml-6 text-3xl font-bold">
                    Explorar todos los géneros:
                </h1>
                <div className="text-black w-11/12 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {categories.length ? (
                        categories.map((category, index) => (
                            <Link
                                href={{
                                    pathname: "/category-songs",
                                    query: { category: category.name },
                                }}
                                key={index}
                            >
                                <div className="bg-manz-200 p-8 font-bold text-xl flex justify-center items-center rounded-md transition-transform hover:scale-105 hover:bg-66D36E">
                                    {category.name}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-white font-bold"> Meterle un loader amigos </p>
                    )}
                </div>
            </div>
        </>
    );
}
