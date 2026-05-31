namespace backend.Models;

public class UpdateGameRequest
{
    public string Name { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;
    public int Year { get; set; }
}