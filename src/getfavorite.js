function getFavorites() {
  try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
  } catch (error) {
      console.error("Error parsing favorites from localStorage:", error);
      return [];
  }
}

function setFavorites(favorites) {
  try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
  }
}

function isFavorited(id) {
  const favorites = getFavorites();
  return favorites.includes(Number(id));
}

function addID(id) {
  const favorites = getFavorites();
  const numId = Number(id);
  if (!favorites.includes(numId)) {
      setFavorites([...favorites, numId]);
  }
}

function removeID(id) {
  const favorites = getFavorites();
  const newFavorites = favorites.filter(fav => fav !== Number(id));
  setFavorites(newFavorites);
}

export { getFavorites, setFavorites, isFavorited, addID, removeID };