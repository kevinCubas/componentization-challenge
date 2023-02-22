import { useEffect, useState } from "react";
import { api } from "../services/api";
import "../styles/content.scss";
import { MovieCard } from "./MovieCard";

interface IMovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface IGenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface IContentProps {
  selectedGenreId: number;
  selectedGenre: IGenreResponseProps
}

export function Content({selectedGenreId, selectedGenre}: IContentProps) {
  const [movies, setMovies] = useState<IMovieProps[]>([]);
  
  useEffect(() => {
    api.get<IMovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}