import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { movieService, type Movie } from "../services/MovieService";
import { taskService} from "../services/taskService";
import { toast } from 'react-toastify'
import "../styles/Movies.css";

// Função auxiliar para formatar a duração 
const formatRuntime = (minutes: number, type: string) => {
  if (type === "SHOW") return `${minutes} min/ep.`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

const MoviePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [movieFind, setMovieFind] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleMovieFind = async () => {
    if (!movieFind.trim()) return;

    setLoading(true);
    setError(null);
    setMovies([]);
    setHasSearched(true);

    try {
      const response = await movieService.getMovies(movieFind);
      setMovies(response.description);
    } catch (err) {
      setError("Falha ao carregar filmes. Verifique sua conexão ou tente outro termo.");
    } finally {
      setLoading(false);
    }
  };


  const handleAddToListClick = async (movie: Movie) => {

    let ondeAssistirInfo = 'Onde assistir: Nenhuma oferta encontrada.';
    const rating = (movie.jwRating * 10).toFixed(1);

    if (movie.offers && movie.offers.length > 0) {
      const firstOffer = movie.offers[0];
      ondeAssistirInfo =
        `Onde assistir: ${firstOffer.name}\n` +
        `Link: ${firstOffer.url}`;
    }

    const taskDescription =
      `${movie.type === "MOVIE" ? "Filme" : "Série"} | ${movie.year} | Nota: ${rating}\n` +
      ondeAssistirInfo + `\n`;

    try {
      await taskService.create({
        nome: `Assistir: ${movie.title}`,
        descricao: taskDescription,
      });
      toast.success(`Filme "${movie.title}" adicionado com sucesso!`);
    } catch (err) {
      toast.error(`Erro ao adicionar "${movie.title}" às tarefas.`);
    }
  };

  const handleDetailsClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <Header />
      <main className="movie-container-simple">
        <div className="movie-search-bar-simple">
          <input
            type="text"
            placeholder="Digite filme ou série..."
            value={movieFind}
            onChange={(e) => setMovieFind(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleMovieFind();
            }}
          />
          <button onClick={handleMovieFind} disabled={loading}>
            {loading ? "Buscando..." : "Pesquisar"}
          </button>
        </div>

        <section className="movie-list-results-simple">
          {loading && <p className="loading-message">Carregando resultados...</p>}
          {error && <p className="error-message-simple">❌ {error}</p>}

          {hasSearched && !loading && !error && movies.length === 0 && (
            <p className="no-results-message-simple">Nenhum resultado encontrado para **"{movieFind}"**.</p>
          )}

          <div className="movie-list-wrapper">
            {movies.map((movie) => {
              const posterUrl = movie.photo_url?.[0] || movie.photo_url?.[1] || "";
              const rating = (movie.jwRating * 10).toFixed(1);


              return (
                <div className="movie-list-item" key={movie.id}>

                  {/* LADO ESQUERDO: Poster e Rating */}
                  <div className="movie-item-details-left">
                    <div className="movie-poster-small-container">
                      <img src={posterUrl} alt={`Poster de ${movie.title}`} className="movie-poster-small" />
                      <span className="movie-item-rating">⭐ {rating}</span>
                    </div>
                  </div>

                  {/* LADO DIREITO: Conteúdo e Ações (Wrapper para alinhamento) */}
                  <div className="movie-item-content-and-actions">
                    {/* Título e Info */}
                    <div className="movie-item-content">
                      <h3 className="movie-item-title">{movie.title}</h3>
                      <p className="movie-item-info">
                        {movie.year} | {formatRuntime(movie.runtime, movie.type)} | {movie.type === "MOVIE" ? "Filme" : "Série"}
                      </p>
                    </div>

                    {/* Botões de Ação */}
                    <div className="movie-item-actions">
                      <button onClick={() => handleDetailsClick(movie.url)} className="action-button details-button">
                        Ver Detalhes em JustWatch
                      </button>
                      <button onClick={() => handleAddToListClick(movie)} className="action-button add-button">
                        Adicionar à Lista
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MoviePage;