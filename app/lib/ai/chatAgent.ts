import { ChatMessage } from '@/types';
import { LocalSearchEngine } from './searchEngine';
import { mockMovies } from '@/lib/data/mockMovies';

interface Intent {
  name: string;
  confidence: number;
  entities: Record<string, any>;
}

export class ChatAgent {
  private searchEngine: LocalSearchEngine;
  private intentions: Map<string, RegExp[]>;

  constructor() {
    this.searchEngine = new LocalSearchEngine(mockMovies);
    this.intentions = new Map([
      ['buscar_pelicula', [
        /buscar.*película/i,
        /buscar.*film/i,
        /quiero ver/i,
        /recomienda/i,
        /películas.*de/i,
        /busco/i,
        /encuentrame/i
      ]],
      ['info_pelicula', [
        /información.*sobre/i,
        /cuéntame.*sobre/i,
        /qué.*trata/i,
        /sinopsis/i,
        /de.*qué.*va/i
      ]],
      ['horarios', [
        /horarios/i,
        /funciones/i,
        /cuando/i,
        /a.*qué.*hora/i,
        /disponible/i
      ]],
      ['saludo', [
        /hola/i,
        /buenos/i,
        /saludos/i,
        /hey/i,
        /qué.*tal/i
      ]],
      ['ayuda', [
        /ayuda/i,
        /help/i,
        /qué.*puedes.*hacer/i,
        /como.*funciona/i
      ]]
    ]);
  }

  async processMessage(message: string, userId?: string): Promise<string> {
    const intent = this.classifyIntent(message);
    const response = await this.generateResponse(intent, message);
    
    return response;
  }

  private classifyIntent(message: string): Intent {
    const lowerMessage = message.toLowerCase();
    
    for (const [intentName, patterns] of this.intentions) {
      for (const pattern of patterns) {
        if (pattern.test(lowerMessage)) {
          const entities = this.extractEntities(message, intentName);
          return {
            name: intentName,
            confidence: 0.8,
            entities
          };
        }
      }
    }

    return { name: 'unknown', confidence: 0.1, entities: {} };
  }

  private extractEntities(message: string, intentName: string): Record<string, any> {
    const entities: Record<string, any> = {};
    
    // Extraer términos de búsqueda para películas
    if (intentName === 'buscar_pelicula') {
      // Buscar patrones como "películas de terror", "buscar payaso", etc.
      const searchPatterns = [
        /(?:buscar|busco|encuentra|películas?\s+de|films?\s+de)\s+(.+)/i,
        /(.+)\s+(?:películas?|films?)/i,
        /"([^"]+)"/i, // Texto entre comillas
      ];
      
      for (const pattern of searchPatterns) {
        const match = message.match(pattern);
        if (match && match[1]) {
          entities.searchTerm = match[1].trim();
          break;
        }
      }
      
      // Si no encontró patrón específico, usar toda la consulta excepto palabras clave
      if (!entities.searchTerm) {
        const cleanMessage = message
          .replace(/(?:buscar|busco|encuentra|quiero ver|recomienda|películas?|films?)/gi, '')
          .trim();
        if (cleanMessage) {
          entities.searchTerm = cleanMessage;
        }
      }
    }

    return entities;
  }

  private async generateResponse(intent: Intent, originalMessage: string): Promise<string> {
    switch (intent.name) {
      case 'saludo':
        return '¡Hola! 👋 Soy tu asistente virtual de cine. Puedo ayudarte a buscar películas, obtener información sobre horarios y más. ¿En qué puedo ayudarte?';

      case 'ayuda':
        return `Puedo ayudarte con:
🎬 Buscar películas (ej: "buscar películas de payasos")
📋 Información sobre películas
🕒 Consultar horarios
🎫 Hacer reservas

¡Solo escribe lo que necesitas!`;

      case 'buscar_pelicula':
        return await this.handleMovieSearch(intent.entities.searchTerm || originalMessage);

      case 'info_pelicula':
        return 'Para obtener información específica sobre una película, puedes buscarla primero. Por ejemplo: "buscar IT" o "información sobre Joker"';

      case 'horarios':
        return '🕒 Los horarios de nuestro cine son:\n• Lunes a Jueves: 14:00, 17:00, 20:00, 22:30\n• Viernes a Domingo: 12:00, 15:00, 18:00, 21:00, 23:30\n\n¿Te interesa alguna película en particular?';

      default:
        return await this.handleUnknownIntent(originalMessage);
    }
  }

  private async handleMovieSearch(searchTerm: string): Promise<string> {
    const results = this.searchEngine.search(searchTerm);
    
    if (results.length === 0) {
      return `No encontré películas relacionadas con "${searchTerm}". 🤔\n\nPrueba con términos como:\n• Géneros (terror, acción, comedia)\n• Actores o directores\n• Palabras clave específicas`;
    }

    const topResults = results.slice(0, 3);
    let response = `🎬 Encontré ${results.length} película(s) relacionada(s) con "${searchTerm}":\n\n`;
    
    topResults.forEach((movie, index) => {
      response += `${index + 1}. **${movie.title}** (${movie.year})\n`;
      response += `   📊 ${movie.rating}/10 | ⏱️ ${movie.duration} min\n`;
      response += `   🎭 ${movie.genre.join(', ')}\n\n`;
    });

    if (results.length > 3) {
      response += `... y ${results.length - 3} más. ¡Usa la búsqueda principal para ver todas!`;
    }

    return response;
  }

  private async handleUnknownIntent(message: string): Promise<string> {
    // Intentar búsqueda como último recurso
    const searchResults = this.searchEngine.search(message);
    
    if (searchResults.length > 0) {
      return await this.handleMovieSearch(message);
    }

    return `No estoy seguro de cómo ayudarte con eso. 🤖\n\nPuedes preguntarme sobre:\n• Buscar películas\n• Horarios del cine\n• Información sobre funciones\n\n¿Qué te gustaría hacer?`;
  }
}