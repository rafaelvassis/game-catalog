export function GameCard({game, onDelete}) {


  return (
    <div>
        <h3>{game.name}</h3>  
        <p>
          {game.genre} • {game.year}
        </p>
        <button onClick={() => onDelete(game.id)}>Delete</button>
    </div>
  )
}
