// Tipos para películas
export interface Movie {
    id: string;
    title: string;
    genre: string[];
    year: number;
    director: string;
    actors: string[];
    synopsis: string;
    poster: string;
    trailer: string;
    rating: number;
    duration: number;
    keywords: string[]; // Para búsqueda IA
    releaseDate: Date;
  }
  
  // Tipos para recursos (Investigación Operativa)
  export interface Resource {
    id: string;
    name: string;
    type: 'SALA' | 'PROYECTOR' | 'PERSONAL' | 'EQUIPO_SONIDO';
    capacity: number;
    cost: number;
    location: string;
    available: boolean;
  }
  
  // Tipos para reservas
  export interface Booking {
    id: string;
    userId: string;
    movieId: string;
    seats: number;
    showtime: Date;
    price: number;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  }
  
  // Tipos para chat IA
  export interface ChatMessage {
    id: string;
    message: string;
    response: string;
    intent: string;
    timestamp: Date;
    userId?: string;
  }
  
  // Tipos para componentes Atomic Design
  export interface ComponentProps {
    className?: string;
    children?: React.ReactNode;
  }