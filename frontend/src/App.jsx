import { useState } from "react";
import { Formulary } from "./components/Formulary";
import { GameCard } from "./components/GameCard";

function App() {
  const [gameList, setGameList] = useState([]);

  const handleDelete = (idToDelete) => {
    setGameList((prevGames) =>
      prevGames.filter((game) => game.id !== idToDelete),
    );
  };

  return (
    <>
      <h1>Game Catalog</h1>

      <div>
        {gameList.map((game) => (
          <GameCard key={game.id} game={game} onDelete={handleDelete} />
        ))}
      </div>
      <br />
      <Formulary setGameList={setGameList} />
    </>
  );
}
export default App;
