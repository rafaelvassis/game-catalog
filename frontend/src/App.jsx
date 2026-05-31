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

  async function deleteGame(idToDelete) {
    const url = `http://localhost:5224/games/${idToDelete}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Request error: ${response.status} `);
      }

      const result = await response.json();
      console.log("Deletion successful: ", result);
    } catch (error) {
      console.error("Deletion failure: ", error);
      throw error;
    }
  }

  const handleDelete = async (idToDelete) => {
    await deleteGame(idToDelete);
    await fetchGames();
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
        gameBeingEdited={gameBeingEdited}
        setGameBeingEdited={setGameBeingEdited}
        gameList={gameList}
        fetchGames={fetchGames}
      />
    </>
  );
}
export default App;
