import { useState, useCallback } from 'react';
import { Movie } from '@/types';
import { LocalSearchEngine } from '@/lib/ai/searchEngine';
import { mockMovies } from '@/lib/data/mockMovies';

export const useMovieSearch = () => {
  const [movies, setMovies] = useState<Movie[]>(mockMovies);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchEngine = new LocalSearchEngine(mockMovies);

  const searchMovies = useCallback(async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);

    try {
      // Simular delay de red para mostrar loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!query.trim()) {
        setMovies(mockMovies);
      } else {
        const results = searchEngine.search(query);
        setMovies(results);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSuggestions = useCallback((query: string): Movie[] => {
    return searchEngine.getSuggestions(query);
  }, []);

  const resetSearch = useCallback(() => {
    setMovies(mockMovies);
    setSearchQuery('');
  }, []);

  return {
    movies,
    isLoading,
    searchQuery,
    searchMovies,
    getSuggestions,
    resetSearch
  };
};