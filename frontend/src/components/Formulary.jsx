import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function Formulary({ setGameList, gameBeingEdited, setGameBeingEdited }) {
  //Estado para o objeto que vai ser criado no formulário
  const [game, setGame] = useState({
    id: "",
    name: "",
    genre: "",
    year: "",
  });

  useEffect(() => {
    if (gameBeingEdited) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGame(gameBeingEdited);
    }
  }, [gameBeingEdited]);

  const handleSubmit = (event) => {
    //Previne comportamento padrão
    event.preventDefault();

    //Valida entrada
    if (!game.name || !game.genre || !game.year) {
      alert("Complete all fields");
      return;
    }

    if (gameBeingEdited) {
      setGameList((prevGames) =>
        prevGames.map((currentGame) =>
          currentGame.id === gameBeingEdited.id ? game : currentGame,
        ),
      );
    } else {
      //Gera novo game
      const newGame = {
        ...game,
        id: uuidv4(),
      };

      // Adiciona novo game à lista
      setGameList((prevGames) => [...prevGames, newGame]);
    }

    // Reseta campos após o envio
    setGame({
      id: "",
      name: "",
      genre: "",
      year: "",
    });

    setGameBeingEdited(null);
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
      <button type="submit">
        {gameBeingEdited ? "Update Game" : "Add Game"}
      </button>
    </form>
  );
}
