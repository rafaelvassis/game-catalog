import { useState } from "react";
import { Formulary } from "./components/Formulary";
import { GameCard } from "./components/GameCard";

function App() {
  const [gameList, setGameList] = useState([]);
  const [gameBeingEdited, setGameBeingEdited] = useState(null);

  const handleDelete = (idToDelete) => {
    setGameList((prevGames) =>
      prevGames.filter((game) => game.id !== idToDelete),
    );
  };

  console.log("Jogo sendo editado", gameBeingEdited);

  return (
    <>
      <h1>Game Catalog</h1>

      <div>
        {gameList.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onDelete={handleDelete}
            onEdit={setGameBeingEdited}
          />
        ))}
      </div>
      <br />
      <Formulary setGameList={setGameList} gameBeingEdited={gameBeingEdited} setGameBeingEdited={setGameBeingEdited} gameList={gameList} />
    </>
  );
}
export default App;
