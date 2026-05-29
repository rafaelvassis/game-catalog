import { useState } from "react";
import { Formulary } from "./components/Formulary";
import { GameCard } from "./components/GameCard";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [games, setGames] = useState([
    {
      id: uuidv4(),
      name: "The Witcher 3",
      genre: "RPG",
      year: 2015,
    },
    {
      id: uuidv4(),
      name: "Elden Ring",
      genre: "Soulslike",
      year: 2022,
    },
    {
      id: uuidv4(),
      name: "Cyberpunk 2077",
      genre: "RPG",
      year: 2020,
    },
  ]);

  return (
    <>
      <h1>Game Catalog</h1>

      <div>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <br />
      <Formulary setGames={setGames} />
    </>
  );
}
export default App;
