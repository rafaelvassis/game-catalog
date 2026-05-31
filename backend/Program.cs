using backend.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("Frontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var games = new List<Game>();

// Endpoint Get
app.MapGet("/games", () =>
{
    return Results.Ok(games);
});


// EndPoint Post
app.MapPost("/games", (Game game) =>
{
    games.Add(game);

    return Results.Created($"/games/{game.Id}", game);
});


// EndPoint Delete
app.MapDelete("/games/{id}", (long id) =>
{
    var game = games.Find(g => g.Id == id);

    if (game is null)
    {
        return Results.NotFound();
    }

    games.Remove(game);

    return Results.Ok(game);
});


// EndPoint PUT
app.MapPut("/games/{id}", (long id, Game gameUpdated) =>
{
    for (int i = 0; i < games.Count; i++)
    {
        if (games[i].Id == id)
        {
            gameUpdated.Id = id;
            games[i] = gameUpdated;

            return Results.Ok(gameUpdated);
        }
    }

    return Results.NotFound();
});


app.Run();
