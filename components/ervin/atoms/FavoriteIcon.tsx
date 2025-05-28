"use client";

import { useState } from "react";

type Props = {
  movieId: string;
};

export default function FavoriteIcon({ movieId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    // TODO: update backend/localStorage
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`text-xl hover:cursor-pointer ${isFavorite ? "text-yellow-400" : "text-white"}`}
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
}
