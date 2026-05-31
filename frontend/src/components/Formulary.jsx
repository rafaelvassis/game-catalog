import { useEffect, useState } from "react";

export function Formulary({
  setGameList,
  gameBeingEdited,
  setGameBeingEdited,
  fetchGames,
}) {
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
      console.log("Success: ", result);
    } catch (error) {
      console.error("Create error: ", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!game.name || !game.genre || !game.year) {
      alert("Complete all fields");
      return;
    }

    const newGame = {
      ...game,
      id: Date.now(),
    };

    console.log("new game: ", newGame);

    if (gameBeingEdited) {
      setGameList((prevGames) =>
        prevGames.map((currentGame) =>
          currentGame.id === gameBeingEdited.id ? game : currentGame,
        ),
      );
    } else {
      await createGame(newGame);
      await fetchGames();
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
