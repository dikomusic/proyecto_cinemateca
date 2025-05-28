'use client'

import { useEffect, useState } from 'react'
import MovieCard from '../molecules/MovieCard'
import { getAllMovies } from '@/lib/contentApi'
import type { Movie } from '@/types/ervin.types'

const watchedIds = ['1']

export default function WatchHistory() {
  const [allMovies, setAllMovies] = useState<Movie[]>([])

  useEffect(() => {
    getAllMovies().then(setAllMovies)
  }, [])

  const history = allMovies.filter((movie) => watchedIds.includes(movie.id))

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Historial de Visualización</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">Aún no has visto nada.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {history.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}
