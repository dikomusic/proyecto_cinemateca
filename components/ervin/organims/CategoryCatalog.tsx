import { Movie } from "@/types/ervin.types";
import MovieCard from "../molecules/MovieCard";

type Props = {
  movies: Movie[];
};

export default function CategoryCatalog({ movies }: Props) {
  return (
    <section className="w-full space-y-4">
      <h2 className="text-xl font-bold">Explorar por Categorías</h2>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
