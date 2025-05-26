import { Movie } from '@/types';

export class LocalSearchEngine {
  private movies: Movie[];

  constructor(movies: Movie[]) {
    this.movies = movies;
  }

  // Búsqueda principal que combina varios algoritmos
  search(query: string): Movie[] {
    if (!query.trim()) return this.movies;

    const keywords = this.extractKeywords(query.toLowerCase());
    const results: Array<{ movie: Movie; score: number }> = [];

    for (const movie of this.movies) {
      const score = this.calculateRelevance(keywords, movie);
      if (score > 0.1) { // Umbral mínimo de relevancia
        results.push({ movie, score });
      }
    }

    // Ordenar por relevancia
    return results
      .sort((a, b) => b.score - a.score)
      .map(result => result.movie);
  }

  // Extracción inteligente de palabras clave
  private extractKeywords(query: string): string[] {
    // Remover palabras comunes (stop words)
    const stopWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'como', 'las', 'del', 'una', 'está', 'muy', 'fue', 'han', 'era', 'más'];
    
    return query
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word))
      .map(word => word.trim());
  }

  // Algoritmo de cálculo de relevancia
  private calculateRelevance(keywords: string[], movie: Movie): number {
    let score = 0;
    const movieTerms = this.getMovieSearchTerms(movie);

    for (const keyword of keywords) {
      for (const term of movieTerms) {
        // Coincidencia exacta (mayor peso)
        if (term === keyword) {
          score += 1.0;
        }
        // Coincidencia parcial
        else if (term.includes(keyword) || keyword.includes(term)) {
          score += 0.7;
        }
        // Similitud de Levenshtein
        else {
          const similarity = this.levenshteinSimilarity(keyword, term);
          if (similarity > 0.7) {
            score += similarity * 0.5;
          }
        }
      }
    }

    // Bonificación por palabras clave específicas del movie
    const keywordMatches = keywords.filter(keyword =>
      movie.keywords.some(movieKeyword => 
        movieKeyword.includes(keyword) || keyword.includes(movieKeyword)
      )
    );
    score += keywordMatches.length * 0.8;

    // Normalizar el score
    return Math.min(score / keywords.length, 3.0);
  }

  // Extraer términos de búsqueda de una película
  private getMovieSearchTerms(movie: Movie): string[] {
    return [
      ...movie.title.toLowerCase().split(/\s+/),
      ...movie.genre.map(g => g.toLowerCase()),
      ...movie.keywords,
      movie.director.toLowerCase(),
      ...movie.actors.map(a => a.toLowerCase().split(' ')).flat(),
      movie.year.toString()
    ].filter(term => term.length > 0);
  }

  // Algoritmo de similitud de Levenshtein
  private levenshteinSimilarity(str1: string, str2: string): number {
    const matrix: number[][] = [];
    const len1 = str1.length;
    const len2 = str2.length;

    if (len1 === 0) return len2 === 0 ? 1 : 0;
    if (len2 === 0) return 0;

    // Inicializar matriz
    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }

    // Llenar matriz
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // sustitución
            matrix[i][j - 1] + 1,     // inserción
            matrix[i - 1][j] + 1      // eliminación
          );
        }
      }
    }

    const maxLen = Math.max(len1, len2);
    return (maxLen - matrix[len1][len2]) / maxLen;
  }

  // Sugerencias inteligentes basadas en una consulta
  getSuggestions(query: string): Movie[] {
    const suggestions = this.search(query);
    
    // Si hay pocos resultados, buscar por género relacionado
    if (suggestions.length < 3) {
      const relatedMovies = this.getRelatedByGenre(suggestions);
      return [...suggestions, ...relatedMovies].slice(0, 8);
    }

    return suggestions.slice(0, 8);
  }

  // Obtener películas relacionadas por género
  private getRelatedByGenre(baseMovies: Movie[]): Movie[] {
    if (baseMovies.length === 0) return [];

    const genres = new Set(baseMovies.flatMap(movie => movie.genre));
    return this.movies.filter(movie =>
      !baseMovies.includes(movie) &&
      movie.genre.some(genre => genres.has(genre))
    );
  }
}