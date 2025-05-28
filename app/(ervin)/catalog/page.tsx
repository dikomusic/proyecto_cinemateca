"use client"


import { useState, useEffect } from 'react'
import { getAllMovies } from '@/lib/contentApi'
import CatalogLayout from '@/components/ervin/templates/CatalogLayout'
import GenreSelector from '@/components/ervin/molecules/GenreSelector'
import CategoryCatalog from '@/components/ervin/organims/CategoryCatalog'
import PersonalizedRecommendations from '@/components/ervin/organims/PersonalizedRecommendations'
import { Movie } from '@/types/ervin.types'


export default function CatalogPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genre, setGenre] = useState<string | null>(null)

  useEffect(() => {
    getAllMovies().then(setMovies)
  }, [])

  const filteredMovies = genre
    ? movies.filter((m) =>
        m.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase())
      )
    : movies

  const recommendedMovies = !genre ? movies.slice(-4) : []

  return (
    <CatalogLayout>
      <GenreSelector selected={genre} onSelect={setGenre} />
      <CategoryCatalog movies={filteredMovies} />
      <PersonalizedRecommendations movies={recommendedMovies} />
    </CatalogLayout>
  )
}
