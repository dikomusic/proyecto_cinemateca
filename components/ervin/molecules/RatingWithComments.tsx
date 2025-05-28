"use client";

import { useState } from "react";

type Comment = {
  user: string;
  text: string;
  rating: number;
};

const dummyComments: Comment[] = [
  { user: "Lucía", text: "Muy buena peli, me encantó.", rating: 5 },
  { user: "Pedro", text: "Buena actuación, pero algo lenta.", rating: 3 },
];

type Props = {
  movieId: string;
};

export default function RatingWithComments({ movieId }: Props) {
  const [comments] = useState<Comment[]>(dummyComments);

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-lg font-bold mb-4">Valoraciones y Comentarios</h2>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div
            key={`${movieId}-${index}`}
            className="p-4 border rounded shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">{comment.user}</span>
              <span className="text-yellow-500">
                {"★".repeat(comment.rating)}
                {"☆".repeat(5 - comment.rating)}
              </span>
            </div>
            <p className="text-gray-700">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
