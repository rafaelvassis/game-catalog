namespace backend.Models;

public class Game
{
    public int Id {get; set;}
    public string Name { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;
    public int Year { get; set; }

}