const btn = document.getElementById("loadFilms");
const list = document.getElementById("filmList");

btn.addEventListener("click", loadFilms);

async function loadFilms() {
  list.innerHTML = "Loading...";

  try {
    // 公式が落ちることがあるので安定ミラーを使用
    const url = "https://swapi.py4e.com/api/films/"; // ←安定
    // 公式を試すときは下でもOK（不安定な時あり）
    // const url = "https://swapi.dev/api/films/?format=json";

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

    const data = await res.json();
    list.innerHTML = "";

    (data.results || []).forEach(film => {
      const li = document.createElement("li");
      li.textContent = `${film.title} (${film.release_date})`;
      list.appendChild(li);
    });

    if (!data.results?.length) list.textContent = "No films found.";
  } catch (err) {
    console.error("Fetch error:", err);
    list.textContent = `Failed to load data. ${String(err)}`;
  }
}
