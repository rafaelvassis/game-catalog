import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function Formulary({ setGameList }) {
  const [game, setGame] = useState({
    id: "",
    name: "",
    genre: "",
    year: "",
  });

  const handleSubmit = (event) => {
    //Previne comportamento padrão
    event.preventDefault();

    //Valida entrada
    if (!game.name || !game.genre || !game.year) {
      alert("Complete all fields");
      return;
    }

    //Gera novo game
    const newGame = {
      ...game,
      id: uuidv4(),
    };

    setGameList((prevGames) => [...prevGames, newGame]);

    //Log para verificar
    console.log("Sending the complete object:", newGame);

    // Limpa campos após o envio
    setGame({
      id: "",
      name: "",
      genre: "",
      year: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setGame({ ...game, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Title </label>
        <input
          type="text"
          name="name"
          id="name"
          value={game.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="genre">Genre </label>
        <input
          type="text"
          name="genre"
          id="genre"
          value={game.genre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="year">Year </label>
        <input
          type="number"
          name="year"
          id="year"
          value={game.year}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Adicionar</button>
    </form>
  );
}
