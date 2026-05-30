export function GameCard({game, onDelete, onEdit}) {
  

  return (
    <div>
        <h3>{game.name}</h3>  
        <p>
          {game.genre} • {game.year}
        </p>
        <button onClick={() => onEdit(game)}>Edit</button>
        <button onClick={() => onDelete(game.id)}>Delete</button>
    </div>
  )
}
