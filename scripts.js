class AudioController {
  constructor() {
      this.bgMusic = new Audio('audio/bgmusic.mp3');
      this.flipSound = new Audio('audio/flip.wav');
      this.victorySound = new Audio ('audio/victory.mp3')
      this.matchedSound = new Audio('audio/matched.mp3');
      this.victorySound.volume = 0.1;
      this.matchedSound.volume= 0.1;
      this.bgMusic.volume = 0.2;
      this.bgMusic.loop = true;

  }

  soundVictory() {
    this.victorySound.play();
  }
  
  startMusic() {
     // this.bgMusic.play();
  }

  soundflip() {
    this.flipSound.play();
  }

  soundMatch() {
    this.matchedSound.play();
  }
}

let audioController = new AudioController;

audioController.startMusic();

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;



function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  audioController.soundflip();

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  audioController.soundMatch();


  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];

}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
