'use client';

import { useState } from 'react';
import { Header, MovieGrid, ChatWidget } from '@/components/organisms';
import { useMovieSearch } from '@/hooks/useMovieSearch';
import { AppProvider, useAppContext } from '@/context/AppContext';
import { ChatAgent } from '@/lib/ai/chatAgent';
import { Movie, ChatMessage } from '@/types';

const chatAgent = new ChatAgent();

function HomePage() {
  const { movies, isLoading, searchMovies } = useMovieSearch();
  const { chatMessages, addChatMessage, setSelectedMovie, currentSection } = useAppContext();
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSearch = async (query: string) => {
    await searchMovies(query);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    // Aquí podrías navegar a una página de detalle
    console.log('Selected movie:', movie);
  };

  const handleWatchTrailer = (movie: Movie) => {
    // Abrir trailer en nueva ventana o modal
    window.open(movie.trailer, '_blank');
  };

  const handleChatMessage = async (message: string) => {
    setIsChatLoading(true);
    
    try {
      const response = await chatAgent.processMessage(message);
      
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        message,
        response,
        intent: 'user_message',
        timestamp: new Date(),
      };
      
      addChatMessage(newMessage);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        message,
        response: 'Lo siento, ocurrió un error. Inténtalo de nuevo.',
        intent: 'error',
        timestamp: new Date(),
      };
      addChatMessage(errorMessage);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleNavigation = (section: string) => {
    console.log('Navigating to:', section);
    // Aquí podrías implementar navegación entre secciones
  };

  return (
    <div className="min-h-screen bg-black">
      <Header 
        onSearch={handleSearch}
        onNavigate={handleNavigation}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
            Cinemateca Digital
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Experiencia cinematográfica inteligente con IA, gestión de recursos y análisis de redes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>🤖 Búsqueda con IA</span>
            <span>📊 Análisis de Recursos</span>
            <span>🌐 Gestión de Red</span>
            <span>💬 Chatbot Inteligente</span>
          </div>
        </section>

        {/* Movies Grid */}
        <MovieGrid
          movies={movies}
          title="Cartelera"
          onMovieSelect={handleMovieSelect}
          onWatchTrailer={handleWatchTrailer}
          isLoading={isLoading}
        />

        {/* Features Section */}
        <section className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-gray-900 rounded-lg">
            <div className="text-3xl mb-4">🎬</div>
            <h3 className="text-lg font-semibold mb-2">Catálogo Inteligente</h3>
            <p className="text-gray-400 text-sm">Búsqueda avanzada con IA que entiende tus preferencias</p>
          </div>
          
          <div className="text-center p-6 bg-gray-900 rounded-lg">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">Gestión de Recursos</h3>
            <p className="text-gray-400 text-sm">Optimización automática de salas y equipamiento</p>
          </div>
          
          <div className="text-center p-6 bg-gray-900 rounded-lg">
            <div className="text-3xl mb-4">🌐</div>
            <h3 className="text-lg font-semibold mb-2">Red Inteligente</h3>
            <p className="text-gray-400 text-sm">Configuración y monitoreo de infraestructura de red</p>
          </div>
          
          <div className="text-center p-6 bg-gray-900 rounded-lg">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-lg font-semibold mb-2">Asistente Virtual</h3>
            <p className="text-gray-400 text-sm">Chatbot con IA para consultas y reservas</p>
          </div>
        </section>
      </main>

      {/* Chat Widget */}
      <ChatWidget
        onSendMessage={handleChatMessage}
        messages={chatMessages}
        isLoading={isChatLoading}
      />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  );
}