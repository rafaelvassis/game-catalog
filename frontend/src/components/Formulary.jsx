import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function Formulary({ setGameList, gameBeingEdited, setGameBeingEdited }) {
  
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

    event.preventDefault();

    // Validate inputs
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
      
      const newGame = {
        ...game,
        id: uuidv4(),
      };

      // Add new game to the list
      setGameList((prevGames) => [...prevGames, newGame]);
    }

    // Reset form inputs
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
