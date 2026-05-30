import { useEffect, useState } from "react";
import { Formulary } from "./components/Formulary";
import { GameCard } from "./components/GameCard";

function App() {
  const [gameList, setGameList] = useState([]);
  const [gameBeingEdited, setGameBeingEdited] = useState(null);

  // Fetch games from backend API
  const fetchGames = async () => {
    const response = await fetch("http://localhost:5224/games");

    const games = await response.json();

    console.log(games);

    setGameList(games);
  };

  // Render games list
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGames();
  }, []);


  // Fromtend handles
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
          <GameCard
            key={game.id}
            game={game}
            onDelete={handleDelete}
            onEdit={setGameBeingEdited}
          />
        ))}
      </div>
      <br />
      <Formulary
        setGameList={setGameList}
        gameBeingEdited={gameBeingEdited}
        setGameBeingEdited={setGameBeingEdited}
        gameList={gameList}
      />
    </>
  );
}
export default App;
