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

app.MapGet("/games", () =>
{
    return new List<Game>
    {
        new()
        {
            Id = 1,
            Name = "The Witcher 3",
            Genre = "RPG",
            Year = 2015
        },
        new()
        {
            Id = 2,
            Name = "Elden Ring",
            Genre = "Soulslike",
            Year = 2022
        }
    };
});


/* app.MapPost("/games", ([FromBody] Game game) =>
{
    return game;
}); */

app.MapPost("/games", (Game game) =>
{
    return game;
});

app.Run();
