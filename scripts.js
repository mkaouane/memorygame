class AudioController {
  constructor() {
      this.bgMusic = new Audio('audio/bgmusic.mp3');
      this.flipSound = new Audio('audio/flip.wav');
      this.victorySound = new Audio ('audio/victory.mp3');
      this.gameOverSound = new Audio ('audio/victory.mp3');
      this.matchedSound = new Audio('audio/matched.mp3');
      this.victorySound.volume = 0.1;
      this.gameOverSound.volume = 0.1;
      this.matchedSound.volume= 0.1;
      this.bgMusic.volume = 0.2;
      this.bgMusic.loop = true;

  }

  soundVictory() {
    this.victorySound.play();
  }

  
  soundGameOver() {
    this.gameOverSound.play();
  }
  
  startMusic() {
     this.bgMusic.play();
  }

  stopMusic() {
    this.bgMusic.pause();
}

  soundflip() {
    this.flipSound.play();
  }

  soundMatch() {
    this.matchedSound.play();
  }
}

class SimplonBallz {
  constructor(totalTime) {
    this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
    

    gameOver() {
      document.getElementById('game-over-text').classList.add('visible');
      document.getElementById('game-over-text').addEventListener('click', function(){location.reload()});
      this.audioController.soundGameOver();
        
    }
   startCountdown() {
    let timer = setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;
      if(this.timeRemaining === 0){
          clearInterval(timer);
          this.gameOver();}
  }, 1000);

  }

 
  

}


let audioController = new AudioController;
let game = new SimplonBallz(100);


game.startCountdown();
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

