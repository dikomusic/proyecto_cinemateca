import React from 'react';
import { MovieCard } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { ComponentProps, Movie } from '@/types';

interface MovieGridProps extends ComponentProps {
  movies: Movie[];
  title?: string;
  onMovieSelect: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
  onLoadMore?: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  title = "Películas",
  onMovieSelect,
  onWatchTrailer,
  onLoadMore,
  isLoading = false,
  hasMore = false,
  className = "",
}) => {
  if (isLoading && movies.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-800 aspect-[2/3] rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-800 rounded mb-2"></div>
              <div className="h-3 bg-gray-800 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎬</div>
          <h3 className="text-xl text-gray-400 mb-2">No se encontraron películas</h3>
          <p className="text-gray-500">Prueba con otros términos de búsqueda</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            genre={movie.genre}
            year={movie.year}
            duration={movie.duration}
            rating={movie.rating}
            poster={movie.poster}
            onSelect={() => onMovieSelect(movie)}
            onWatchTrailer={() => onWatchTrailer(movie)}
          />
        ))}
      </div>

      {/* Botón cargar más */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            variant="ghost"
            onClick={onLoadMore}
            disabled={isLoading}
            className="min-w-32"
          >
            {isLoading ? 'Cargando...' : 'Cargar más'}
          </Button>
        </div>
      )}
    </div>
  );
};