const gameListContainer = document.getElementById('game-list');
const searchInput = document.getElementById('search-input');

let gamesData = [];

// Fetch games from GitHub
fetch('https://raw.githubusercontent.com/wicorn29/DSU/refs/heads/Web/hostedData/games.json')
  .then(response => response.json())
  .then(data => {
    gamesData = data;
    gamesData.sort((a, b) => a.name.localeCompare(b.name));
    renderGames(gamesData);
  })
  .catch(error => {
    console.error('Error loading game data:', error);
    gameListContainer.innerHTML = '<p>Error loading games. Please try again later.</p>';
  });

// Function to render games
function renderGames(games) {
  gameListContainer.innerHTML = '';
  games.forEach(game => {
    const { name, description, imageUrl, gameid } = game;

    const gameItem = document.createElement('div');
    gameItem.classList.add('game-item');

    const gameImage = document.createElement('img');
    gameImage.src = imageUrl;
    gameItem.appendChild(gameImage);

    const gameInfo = document.createElement('div');
    gameInfo.classList.add('game-info');

    const gameTitle = document.createElement('h3');
    gameTitle.textContent = name;
    gameInfo.appendChild(gameTitle);

    const gameDescription = document.createElement('p');
    gameDescription.textContent = description;
    gameInfo.appendChild(gameDescription);

    const detailsBtn = document.createElement('a');
    detailsBtn.classList.add('details-btn');
    detailsBtn.href = `https://wicorn29.github.io/DSU/gdetails.html?id=${gameid}`;
    detailsBtn.target = '_blank'; // Open in a new window or tab
    detailsBtn.textContent = 'More Details';
    gameInfo.appendChild(detailsBtn);

    gameItem.appendChild(gameInfo);
    gameListContainer.appendChild(gameItem);
  });
}

// Search functionality
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filteredGames = gamesData.filter(game =>
    game.name.toLowerCase().includes(query)
  );
  renderGames(filteredGames);
});
