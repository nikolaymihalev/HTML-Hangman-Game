const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");

let currentWord;

const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random()*wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(()=>`<li class="letter"></li>`).join("");
}

const initGame = (button, clickedLetter)=>{
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index)=>{
            if(letter===clickedLetter){
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else {

    }
}

for(let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);    
}

getRandomWord();