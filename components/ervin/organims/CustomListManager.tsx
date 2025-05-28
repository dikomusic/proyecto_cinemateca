'use client'

import { useEffect, useState } from 'react'
import MovieCard from '../molecules/MovieCard'
import { getAllMovies } from '@/lib/contentApi'
import type { Movie } from '@/types/ervin.types'

const initialIds = ['1', '2', '3', '4']

export default function CustomListManager() {
  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const [myListIds, setMyListIds] = useState<string[]>(initialIds)

  useEffect(() => {
    getAllMovies().then(setAllMovies)
  }, [])

  const myList = allMovies.filter((movie) => myListIds.includes(movie.id))

  const removeFromList = (id: string) => {
    setMyListIds((prev) => prev.filter((movieId) => movieId !== id))
  }

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">Mi Lista Personalizada</h2>
      {myList.length === 0 ? (
        <p className="text-gray-500">No tienes contenido en tu lista.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {myList.map((movie) => (
            <div key={movie.id} className="w-fit relative group">
              <MovieCard movie={movie} />
              <button
                onClick={() => removeFromList(movie.id)}
                className="absolute bottom-2 right-2 text-white bg-red-500 rounded px-3 py-2 text-xs hover:cursor-pointer hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
