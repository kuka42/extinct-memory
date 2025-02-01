const gameContainer = document.getElementById("memory-game");

// Ścieżka do ilustracji, która będzie wierzchem każdej karty
const frontFacePath = "pic/front.jpg";

// Obrazy dla kart (zapewnij pary)
const cards = [
    "pic/01.jpg", "pic/02.jpg", "pic/03.jpg", "pic/04.jpg", "pic/05.jpg",
    "pic/06.jpg", "pic/07.jpg", "pic/08.jpg", "pic/09.jpg", "pic/10.jpg",
    "pic/11.jpg", "pic/12.jpg", "pic/13.jpg", "pic/14.jpg", "pic/15.jpg",
    "pic/16.jpg", "pic/17.jpg", "pic/18.jpg", "pic/19.jpg", "pic/20.jpg"
];

// Duplikujemy karty, żeby były pary, i mieszamy je
const deck = [...cards, ...cards].sort(() => 0.5 - Math.random());

let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0; // Licznik dopasowanych par

// Funkcja do tworzenia elementów kart
function createCard(imagePath) {
    const card = document.createElement("div");
    card.classList.add("memory-card");

    const frontFace = document.createElement("img");
    frontFace.classList.add("front-face");
    frontFace.src = frontFacePath;

    const backFace = document.createElement("img");
    backFace.classList.add("back-face");
    backFace.src = imagePath;

    card.appendChild(frontFace);
    card.appendChild(backFace);
    card.addEventListener("click", flipCard);

    return card;
}

// Inicjalizacja gry - tworzymy i dodajemy karty do kontenera gry
deck.forEach(imagePath => {
    const card = createCard(imagePath);
    gameContainer.appendChild(card);
});

// Funkcja obracania kart
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Funkcja sprawdzająca, czy karty pasują
function checkForMatch() {
    const isMatch = firstCard.querySelector(".back-face").src === secondCard.querySelector(".back-face").src;
    isMatch ? disableCards() : unflipCards();
}

// Funkcja blokująca dopasowane karty
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    matchedPairs++; // Zwiększamy licznik dopasowanych par

    resetBoard();
    checkWin(); // Sprawdzamy, czy gracz wygrał
}

// Funkcja obracająca nietrafione karty z powrotem
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000);
}

// Funkcja resetująca tablicę
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Funkcja sprawdzająca warunek wygranej
function checkWin() {
    if (matchedPairs === cards.length) {
        setTimeout(() => {
            window.location.href = "win.html"; // Przekierowanie po ukończeniu gry
        }, 1000); // Krótkie opóźnienie, by gracz zobaczył ostatnią parę
    }
}