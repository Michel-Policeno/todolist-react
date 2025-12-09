import { api } from "./api";

export interface Offer {
  type: string;
  name: string;
  url: string;
}

export interface Movie {
  id: number;
  type: string; 
  url: string; 
  title: string;
  year: number;
  runtime: number;
  photo_url: string[];
  backdrops: string[];
  tmdbId: string;
  imdbId: string;
  jwRating: number; 
  tomatoMeter: number; 
  tomatoCertifiedFresh: boolean;
  offers: Offer[]
}

export interface MovieResponse {
  ok: boolean;
  int: number;
  description: Movie[];
}

export const movieService = {

  async getMovies(movie: string): Promise<MovieResponse> {
    try {
      const { data } = await api.get(`/movies/${movie}`);
      return data;
    } catch (error: any) {
      console.error("Erro ao buscar filmes:", error);
      throw new Error("Falha ao buscar filmes.");
    }}
} 