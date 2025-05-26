import React, { useState } from 'react';
import { Button } from '@/components/atoms';
import { SearchBar } from '@/components/molecules';
import { ComponentProps } from '@/types';

interface HeaderProps extends ComponentProps {
  onSearch: (query: string) => void;
  onNavigate?: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onNavigate,
  className = "",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Inicio', value: 'home' },
    { label: 'Cartelera', value: 'movies' },
    { label: 'Experiencias', value: 'experiences' },
    { label: 'Admin', value: 'admin' },
    { label: 'Red', value: 'network' },
  ];

  const handleNavigation = (section: string) => {
    onNavigate?.(section);
    setIsMenuOpen(false);
  };

  return (
    <header className={`bg-black border-b border-gray-800 sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-red-500">
              🎬 Cinemateca
            </h1>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavigation(item.value)}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Barra de búsqueda */}
          <div className="hidden sm:block">
            <SearchBar 
              onSearch={onSearch}
              placeholder="Buscar películas..."
              className="w-80"
            />
          </div>

          {/* Botones de acción */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Iniciar Sesión
            </Button>
            <Button variant="primary" size="sm">
              Registrarse
            </Button>
          </div>

          {/* Menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil expandido */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
              {/* Búsqueda móvil */}
              <div className="mb-4">
                <SearchBar 
                  onSearch={onSearch}
                  placeholder="Buscar películas..."
                />
              </div>
              
              {/* Navegación móvil */}
              {navigationItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavigation(item.value)}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Botones móviles */}
              <div className="flex space-x-2 pt-4">
                <Button variant="ghost" size="sm" className="flex-1">
                  Iniciar Sesión
                </Button>
                <Button variant="primary" size="sm" className="flex-1">
                  Registrarse
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};