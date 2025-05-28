import { Movie } from "@/types/ervin.types";

const MOCK_DB: Movie[] = [
  {
    id: "1",
    title: "El ladron de perros",
    image: "/ervin/movies/el-ladron-de-perros/el-ladron-de-perros.jpg",
    description: "El ladron de perros",
    releaseYear: 2006,
    duration: "2h 22m",
    cast: ["Brad Pitt", "Leonardo DiCaprio", "Morgan Freeman"],
    director: "Quentin Tarantino",
    genres: ["Drama", "Action"],
    quality: "HD",
    videoUrl: "/ervin/movies/el-ladron-de-perros/el-ladron-de-perros.mp4",
  },

  {
     id: "2",
    title: "Los Guardianes de la Galaxia Vol3",
    image: "/ervin/movies/guardianes-de-la-galaxia-3/guardianes-galaxia-3.jpg",
    description: "El ladron de perros",
    releaseYear: 2023,
    duration: "3h 10m",
    cast: ["Brad Pitt", "Leonardo DiCaprio", "Morgan Freeman"],
    director: "Quentin Tarantino",
    genres: ["Science Fiction"],
    quality: "4K",
    videoUrl: "/ervin/movies/guardianes-de-la-galaxia-3/guardianes-galaxia-3.mp4",
  },
];


export async function getAllMovies(): Promise<Movie[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_DB), 200);
  });
}

export async function getMovieById(id: string): Promise<Movie> {
  return new Promise((resolve, reject) => {
    const movie = MOCK_DB.find((m) => m.id == id);
    setTimeout(() => {
      if (movie) resolve(movie);
      else reject(new Error("Movie not found"));
    }, 200);
  });
}
