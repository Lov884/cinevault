const grid = document.getElementById("movieGrid");
const search = document.getElementById("searchInput");
const detailsSection = document.getElementById("details");
const detailsCard = document.getElementById("detailsCard");
const movieSelect = document.getElementById("movieSelect");
const form = document.getElementById("reviewForm");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

// Populate Form Dropdown
MOVIES.forEach(m => {
  const opt = document.createElement("option");
  opt.value = m.id; opt.textContent = m.title;
  movieSelect.appendChild(opt);
});

// 1. RENDER MOVIES (DOM manipulation)
function renderMovies(list = MOVIES) {
  grid.innerHTML = "";
  list.forEach(m => {
    const card = document.createElement("article");
    card.className = "movie-card";
    // Using semantic alt tags for images
    card.innerHTML = `
      <img src="${m.img}" alt="Poster of the movie ${m.title}">
      <h3>${m.title}</h3>
      <p>⭐ ${m.rating}</p>
      <button onclick="showDetails(${m.id})">Details</button>
    `;
    grid.appendChild(card);
  });
}

// 2. SEARCH EVENT (User interaction)
search.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = MOVIES.filter(m => m.title.toLowerCase().includes(query));
  renderMovies(filtered);
});

// 3. SHOW DETAILS (Changes DOM, hides/shows block)
window.showDetails = function(id) {
  const movie = MOVIES.find(m => m.id === id);
  detailsCard.innerHTML = `
    <img src="${movie.img}" alt="Poster of the movie ${movie.title}">
    <div>
      <h3>${movie.title} (${movie.year})</h3>
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <p>${movie.desc}</p>
    </div>
  `;
  detailsSection.hidden = false;
  detailsSection.scrollIntoView({ behavior: 'smooth' });
};

// 4. FORM VALIDATION (Custom JavaScript check)
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page reload
  formError.textContent = "";
  formSuccess.textContent = "";

  const movieId = movieSelect.value;
  const author = document.getElementById("author").value.trim();
  const rating = document.getElementById("rating").value;
  const text = document.getElementById("reviewText").value.trim();

  // Client-side validation
  if (!movieId) return formError.textContent = "Please select a movie.";
  if (author.length < 2) return formError.textContent = "Name must be at least 2 characters.";
  if (rating < 1 || rating > 10 || rating === "") return formError.textContent = "Rating must be between 1 and 10.";
  if (text.length < 10) return formError.textContent = "Review must be at least 10 characters.";

  // If passes
  formSuccess.textContent = "Review submitted successfully!";
  form.reset();
});

// Initial render
renderMovies();