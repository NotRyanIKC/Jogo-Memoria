const images = [
    "bob.jpg", "poze.jpg", "Ds3.jpg", 
    "heineken.jpg", "ichigo.png", "shadow.jpg"
  ];
  const cardBack = "card-back.jpg";
  
  let gameBoard = document.getElementById("game-board");
  let scoreElement = document.getElementById("score");
  let chancesElement = document.getElementById("chances");
  let resetButton = document.getElementById("reset-btn");
  
  let score = 0;
  let chances = 3;
  let flippedCards = [];
  let matchedPairs = 0;
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function initializeGame() {
    let cards = [...images, ...images];
    cards = shuffle(cards);
  
    gameBoard.innerHTML = "";
    cards.forEach((image, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.image = image;
  
      const img = document.createElement("img");
      img.src = image;
  
      card.appendChild(img);
      card.addEventListener("click", () => flipCard(card));
      gameBoard.appendChild(card);
    });
  
    score = 0;
    chances = 3;
    matchedPairs = 0;
    updateScore();
    updateChances();
  }
  
  function flipCard(card) {
    if (flippedCards.length === 2 || card.classList.contains("flipped")) return;
  
    card.classList.add("flipped");
    flippedCards.push(card);
  
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
  
  function checkMatch() {
    const [card1, card2] = flippedCards;
  
    if (card1.dataset.image === card2.dataset.image) {
      score += 3;
      matchedPairs++;
      flippedCards = [];
  
      if (matchedPairs === images.length) {
        setTimeout(() => alert("Você venceu!"), 300);
      }
    } else {
      score = Math.max(score - 2, 0);
      chances--;
  
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
  
      if (chances === 0) {
        setTimeout(() => {
          alert("Você perdeu!");
          initializeGame();
        }, 300);
      }
    }
  
    updateScore();
    updateChances();
  }
  
  function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
  }
  
  function updateChances() {
    chancesElement.textContent = `Chances Restantes: ${chances}`;
  }
  
  resetButton.addEventListener("click", initializeGame);
  
  initializeGame();
  