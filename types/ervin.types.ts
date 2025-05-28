export type Genre = 'Action' | 'Comedy' | 'Drama' | 'Horror' | 'Science Fiction' | 'Romance'

export type Movie = {
  id: string;
  title: string;
  image: string;
  description: string;
  releaseYear: number;
  duration: string;
  videoUrl: string;
  quality: "HD" | "4K";
  director: string;
  cast: string[];
  genres: Genre[];
};
