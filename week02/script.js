document.getElementById("loadFilms").addEventListener("click", async () => {
  const list = document.getElementById("filmList");
  list.innerHTML = "Loading...";

  try {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    list.innerHTML = ""; // clear loading text
    data.results.forEach(film => {
      const li = document.createElement("li");
      li.textContent = `${film.title} (${film.release_date})`;
      list.appendChild(li);
    });
  } catch (error) {
    list.innerHTML = "Failed to load data.";
    console.error(error);
  }
});
