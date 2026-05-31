const API_URL = "http://localhost:5224/games";

export async function getGames() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Request error: ${response.status}`);
  }

  return response.json();
}

export async function createGame(newGame) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    });

    if (!response.ok) {
      throw new Error(`Request error: ${response.status} `);
    }

    return await response.json();
  } catch (error) {
    console.error("Creation error : ", error);
    throw error;
  }
}

export async function updateGame(idToUpdate, gameUpdated) {
  try {
    const response = await fetch(`${API_URL}/${idToUpdate}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameUpdated),
    });

    if (!response.ok) {
      throw new Error(`Request error: ${response.status} `);
    }

    return await response.json();
  } catch (error) {
    console.error("Update error : ", error);
    throw error;
  }
}

export async function deleteGame(idToDelete) {
  try {
    const response = await fetch(`${API_URL}/${idToDelete}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Request error: ${response.status} `);
    }

    return await response.json();
  } catch (error) {
    console.error("Deletion failure: ", error);
    throw error;
  }
}
