import Link from "next/link";

type Movie = {
  id: string;
  title: string;
  image: string;
  releaseYear?: number;
  duration?: string;
};

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  return (
    <Link href={`/content/${movie.id}`} className="flex flex-col gap-2 items-start w-fit p-2 rounded-md bg-white hover:bg-gray-100 shadow-md group">
      <div className="w-60 h-80 flex-shrink-0 rounded overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="shadow-md object-cover w-full h-full transition group-hover:scale-105"
        />
      </div>
      <div>
        <h1 className="text-xl font-bold mb-2 overflow-hidden text-ellipsis whitespace-nowrap w-60">{movie.title}</h1>
        <p className="text-gray-500">
          {movie.releaseYear} • {movie.duration}
        </p>
      </div>
    </Link>
  );
}
