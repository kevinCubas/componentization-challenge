import { useEffect, useState } from "react";
import { api } from "../services/api";
import "../styles/sidebar.scss";
import { Button } from "./Button";

interface IGenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ISideBarProps {
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({handleClickButton, selectedGenreId}: ISideBarProps) {
  const [genres, setGenres] = useState<IGenreResponseProps[]>([]);

  useEffect(() => {
    api.get<IGenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  
  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}