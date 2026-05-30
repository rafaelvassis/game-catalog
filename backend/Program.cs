using backend.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var games = new List<Game>();

foreach (Game g in games)
{
    System.Console.WriteLine(g);
}

app.MapGet("/games", () =>
{
    return games;
});


app.MapPost("/games", (Game game) =>
{
    games.Add(game);

    return game;
});


app.MapDelete("/games/{id}", (int id) =>
{

    for (int i = 0; i < games.Count; i++)
    {
        if (games[i].Id == id)
        {
            return games.Remove(games[i]);
        }
    }

    return false;
});

app.Run();
