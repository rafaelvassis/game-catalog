import { useEffect, useState } from "react";

export function Formulary({ gameBeingEdited, setGameBeingEdited, fetchGames }) {
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

  // Utils ↓  ↓  ↓  ↓  ↓

  function inputValidation(game) {
    if (!game.name || !game.genre || !game.year) {
      alert("Complete all fields");

      return false;
    }

    return true;
  }

  function resetForm() {
    setGame({
      id: "",
      name: "",
      genre: "",
      year: "",
    });

    setGameBeingEdited(null);
  }

  function gameSetted() {
    const newGame = {
      ...game,
      id: Date.now(),
    };

    return newGame;
  }

  // API functions  ↓  ↓  ↓  ↓  ↓

  async function updateGame(idToUpdate, gameUpdated) {
    const url = `http://localhost:5224/games/${idToUpdate}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameUpdated),
      });

      if (!response.ok) {
        throw new Error(`Request error: ${response.status} `);
      }

      const result = await response.json();
      console.log("Update successful: ", result);

    } catch (error) {
      console.error("Creation error : ", error);
      throw error;
    }
  }

  async function createGame(newGame) {
    const url = "http://localhost:5224/games";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGame),
      });

      if (!response.ok) {
        throw new Error(`Request error: ${response.status} `);
      }

      const result = await response.json();
      console.log("Creation successful: ", result);
    } catch (error) {
      console.error("Creation error : ", error);
      throw error;
    }
  }

  // Handles  ↓  ↓  ↓  ↓  ↓

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputValidation(game)) return;

    const newGame = gameSetted();

    if (gameBeingEdited) {
      await updateGame(gameBeingEdited.id, newGame);
      await fetchGames();
    } else {
      await createGame(newGame);
      await fetchGames();
    }

    resetForm();
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
