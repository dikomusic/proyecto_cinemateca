import React from 'react';
import { ComponentProps } from '@/types';

interface RatingStarsProps extends ComponentProps {
  rating: number; // De 0 a 10
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  onRatingChange?: (rating: number) => void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 'md',
  readonly = true,
  onRatingChange,
  className = "",
}) => {
  // Convertir rating de 0-10 a 0-5 estrellas
  const normalizedRating = (rating / 10) * maxStars;
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  const handleStarClick = (starIndex: number) => {
    if (!readonly && onRatingChange) {
      const newRating = ((starIndex + 1) / maxStars) * 10;
      onRatingChange(newRating);
    }
  };

  return (
    <div className={`flex items-center gap-1 ${sizeClasses[size]} ${className}`}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= normalizedRating;
        const isHalfFilled = starValue - 0.5 <= normalizedRating && starValue > normalizedRating;
        
        return (
          <button
            key={index}
            onClick={() => handleStarClick(index)}
            disabled={readonly}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          >
            <span className={`${
              isFilled 
                ? 'text-yellow-400' 
                : isHalfFilled 
                  ? 'text-yellow-200' 
                  : 'text-gray-600'
            }`}>
              ⭐
            </span>
          </button>
        );
      })}
      <span className="ml-2 text-sm text-gray-400">
        {rating.toFixed(1)}/10
      </span>
    </div>
  );
};