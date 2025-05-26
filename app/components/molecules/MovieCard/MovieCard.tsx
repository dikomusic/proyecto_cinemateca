import React from 'react';
import { Badge } from '@/components/atoms';
import { Button } from '@/components/atoms';
import { ComponentProps } from '@/types';

interface MovieCardProps extends ComponentProps {
  title: string;
  genre: string[];
  year: number;
  duration: number;
  rating: number;
  poster: string;
  onSelect?: () => void;
  onWatchTrailer?: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  title,
  genre,
  year,
  duration,
  rating,
  poster,
  onSelect,
  onWatchTrailer,
  className = "",
}) => {
  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}>
      {/* Imagen del poster */}
      <div className="relative aspect-[2/3] bg-gray-800">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-movie.jpg';
          }}
        />
        <div className="absolute top-2 right-2">
          <Badge variant="info" size="sm">
            ⭐ {rating.toFixed(1)}
          </Badge>
        </div>
      </div>

      {/* Información de la película */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
          {title}
        </h3>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {genre.slice(0, 2).map((g, index) => (
            <Badge key={index} variant="default" size="sm">
              {g}
            </Badge>
          ))}
        </div>

        <div className="text-sm text-gray-400 mb-3">
          <span>{year}</span> • <span>{duration} min</span>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="primary" 
            size="sm" 
            onClick={onSelect}
            className="flex-1"
          >
            Ver Detalles
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onWatchTrailer}
          >
            Trailer
          </Button>
        </div>
      </div>
    </div>
  );
};