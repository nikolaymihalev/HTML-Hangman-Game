const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainButton = document.querySelector(".play-again");

const maxGuesses = 6;

let currentWord;
let wrongGuessCount;
let correctLetters;

const gameOver = (isVictory)=>{
    setTimeout(()=>{
        const modalText = isVictory? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory?'victory':'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory?'Congrats!':'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText}<b>${currentWord}</b>`;
        gameModal.classList.add("show");
    },300);
}

const resetGame = () =>{
    console.log("purvi");
    correctLetters = [];
    wrongGuessCount = 0;
    wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    console.log("vtori");
    gameModal.classList.remove("show");
    console.log("treti");
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    console.log("chetvurti");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    console.log("peti");
}

const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random()*wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const initGame = (button, clickedLetter)=>{
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index)=>{
            if(letter===clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount===maxGuesses) return gameOver(false);
    if(correctLetters.length===currentWord.length) return gameOver(true);
}

for(let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);    
    button.addEventListener("click",e=>initGame(e.target,String.fromCharCode(i)));
}

getRandomWord();
playAgainButton.addEventListener("click",getRandomWord());