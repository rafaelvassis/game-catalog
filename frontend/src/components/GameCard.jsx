export function GameCard({game}) {


  return (
    <div>
        <h3>{game.name}</h3>  
        <p>
          {game.genre} • {game.year}
        </p>
        <button>Alterar</button>
        <button>Excluir</button>
    </div>
  )
}
