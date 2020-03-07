// Global variables
const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const ul = phrase.firstElementChild;
let missed = 0;
const overlay = document.querySelector("#overlay");
let phrasesArray = [
  "I am Groot",
  "Why so serious",
  "I drink and I know things",
  "Winter is coming",
  "May the force be with you"
];

// Start game
overlay.addEventListener("click", (e)=>{
  if(e.target.tagName === "A"){
    overlay.style.display = "none";
  }
  addPhraseToDisplay(getRandomPhraseAsArray());
});
// restart game
const restartGame = ()=>{
  const startButton = overlay.lastElementChild;
  startButton.textContent = "Play again!";
  overlay.addEventListener("click", (e)=>{
    if(e.target.tagName === "A"){
      overlay.style.display = "none";
      const chosen = document.querySelectorAll(".chosen");
      for(let i = 0; i < chosen.length; i += 1){
        chosen[i].className = "";
        chosen[i].disabled = false;
      }

      while(ul.firstElementChild){
        ul.removeChild(ul.firstElementChild);
      }

      // remove win/lose message
      if(overlay.firstElementChild.tagName === "P"){
        overlay.firstElementChild.remove();
      }
      missed = 0;
      createHearts();
      const randArray = getRandomPhraseAsArray();
      addPhraseToDisplay(randArray);
    }
  });
}
// Get a random phrase, and split into characters in new array
const getRandomPhraseAsArray = ()=>{
  let newPhrase = [];
  let randNum = Math.floor(Math.random() * phrasesArray.length);
  newPhrase = phrasesArray[randNum].split("");
  return newPhrase;  
}

getRandomPhraseAsArray();
// Create Li items for each letter, and add letter class to each letter
const addPhraseToDisplay = (arr)=>{

  for(let i = 0; i < arr.length; i += 1){
    const li = document.createElement("li");
    li.textContent = arr[i];
    ul.appendChild(li);
    if(li.textContent !== " "){
      li.className = "letter";
    }else{
      li.className = "space";
    }
  }
}

// run function

// check to see if letter matched picked letter by user
const checkLetter = (pickedLetter) =>{  
  const list = ul.querySelectorAll(".letter");
  let matchedLetter = "";

  list.forEach(letter =>{
    if(letter.textContent.toLowerCase() === pickedLetter.toLowerCase()){
      letter.className = "show letter effect";
      setTimeout(()=>{
        letter.className = "show letter";
      }, 300);
      matchedLetter = letter.textContent;
    }
  });

  if(matchedLetter !== ""){
    return matchedLetter;
  }else{
    return null;
  }
}

// Event listener for picked letter
qwerty.addEventListener('click', (e) =>{
  if(e.target.tagName === "BUTTON"){
    let tries = document.querySelector(".tries");
    let ol = tries.parentNode;
    const button = e.target;
    button.className = "chosen";
    button.disabled = true;
    const letter = button.textContent;
    let letterFound = checkLetter(letter);
    if(letterFound === null){
      ol.removeChild(tries);
      missed += 1;
    }
    checkWin();
  }
});

const winOrLoseMessage = (message, result) =>{
  const paragraph = document.createElement("p");
  const title = overlay.firstElementChild;
  paragraph.textContent = message;
  overlay.className = result;
  overlay.style.display = "";
  overlay.insertBefore(paragraph, title);
}

const checkWin = ()=>{
  const letters = document.querySelectorAll(".letter");
  const show = document.querySelectorAll(".show");
  //check if letters with class show === letters with class letters
  if(letters.length === show.length){
    setTimeout(()=>{
      winOrLoseMessage("Congratulations! You win!", "win");
      restartGame();
    }, 1000);   
  }
  if(missed >= 5){
    winOrLoseMessage("Sorry, you lose!", "lose");
    restartGame();
  }
}

// create hearts
const createHearts = ()=>{
  const heartsList = document.querySelector("#scoreboard").firstElementChild;
  const heartsNeeded = 5 - heartsList.children.length;

  if(heartsNeeded > 0){
    for(let i = 0; i < heartsNeeded; i += 1){
      const li = document.createElement("li");
      const img = document.createElement("img");
      li.className = "tries";
      img.src = "images/liveHeart.png";
      img.height = "30";
      img.width = "30";
      li.appendChild(img);
      heartsList.appendChild(li);
      console.log(heartsList.children.length);
    }
  }
}

