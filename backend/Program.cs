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

long nextId = games.Count == 0
    ? 1
    : games.Max(g => g.Id) + 1;

// Endpoint Get
app.MapGet("/games", () =>
{
    return Results.Ok(games);
});

// EndPoint Post
app.MapPost("/games", (CreateGameRequest request) =>
{
    Game game = new Game(nextId, request.Name, request.Genre, request.Year);

    games.Add(game);

    nextId++;

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
app.MapPut("/games/{id}", (long id, UpdateGameRequest request) =>
{
    Game? game = games.Find(g => g.Id == id);

    if (game is not null)
    {
        game.Name = request.Name;
        game.Genre = request.Genre;
        game.Year = request.Year;
        
        return Results.Ok(game);
    }

    return Results.NotFound();


});


app.Run();
