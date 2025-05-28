import { Movie } from "@/types/ervin.types";
import Link from "next/link";

type Props = {
  movie: Movie;
};

export default function ExtendedInfoBlock({ movie }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">{movie.title}</h2>

      {movie.director && (
        <p>
          <span className="font-semibold">Director:</span> {movie.director}
        </p>
      )}
      {movie.genres && movie.genres.length > 0 && (
        <p>
          <span className="font-semibold">Géneros:</span>{" "}
          {movie.genres.join(", ")}
        </p>
      )}
      <p className="text-gray-500">
        {movie.releaseYear} • {movie.duration}
      </p>

      <Link
        href={`/play/${movie.id}`}
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ver Película
      </Link>

      <p className="text-gray-800">{movie.description}</p>

      {movie.cast && movie.cast.length > 0 && (
        <p>
          <span className="font-semibold">Elenco:</span> {movie.cast.join(", ")}
        </p>
      )}
    </div>
  );
}
