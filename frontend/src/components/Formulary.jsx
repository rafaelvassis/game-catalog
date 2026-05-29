import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function Formulary({ setGames }) {
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
      alert("Preencha todos os campos");
      return;
    }

    //Gera novo game
    const newGame = {
      ...game,
      id: uuidv4(),
    };

    setGames((prevGames) => [...prevGames, newGame]);

    //Log para verificar
    console.log("Enviando o objeto completo:", newGame);

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
        <label htmlFor="name">Nome do Jogo </label>
        <input
          type="text"
          name="name"
          id="name"
          value={game.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="genre">Gênero </label>
        <input
          type="text"
          name="genre"
          id="genre"
          value={game.genre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="year">Ano </label>
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
