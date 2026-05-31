namespace backend.Models;

public class Game(long id, string name, string genre, int year)
{
    public long Id { get; set; } = id;
    public string Name { get; set; } = name;
    public string Genre { get; set; } = genre;
    public int Year { get; set; } = year;

}