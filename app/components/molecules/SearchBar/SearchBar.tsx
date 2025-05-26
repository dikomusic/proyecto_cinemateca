import React, { useState } from 'react';
import { Input } from '@/components/atoms';
import { Button } from '@/components/atoms';
import { ComponentProps } from '@/types';

interface SearchBarProps extends ComponentProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Buscar películas...",
  initialValue = "",
  className = "",
}) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 w-full max-w-md ${className}`}>
      <Input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        className="flex-1"
      />
      <Button type="submit" variant="primary">
        Buscar
      </Button>
    </form>
  );
};