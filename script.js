const apiKey = "91ef694b6670446da388fee85f115252""; 
const newsContainer = document.getElementById("newsContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// Fetch top headlines by default
fetchNews("latest");
fetchNews("indian news")

async function fetchNews(query) {
  newsContainer.innerHTML = "<p style='text-align:center;'>Loading news...</p>";
  const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=12&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.articles.length === 0) {
      newsContainer.innerHTML = "<p style='text-align:center;'>No news found.</p>";
      return;
    }
    displayNews(data.articles);
  } catch (error) {
    newsContainer.innerHTML = "<p style='text-align:center;color:red;'>Error fetching news.</p>";
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    const card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="News Image" />
      <div class="news-content">
        <h2>${article.title}</h2>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `;
    newsContainer.appendChild(card);
  });
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchNews(query);
});
langSelect.addEventListener("change", () => {
  currentLang = langSelect.value;
  const activeCategory = document.querySelector(".cat-btn.active");
  fetchNews(activeCategory ? activeCategory.getAttribute("data-category") : "general", true);
});



