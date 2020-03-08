// Global variables
const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const overlay = document.querySelector("#overlay");
const ul = phrase.firstElementChild;
let missed = 0;

// Phrases
let phrasesArray = [
  "I am Groot",
  "Why so serious",
  "I drink and I know things",
  "Winter is coming",
  "May the force be with you"
];

overlay.addEventListener("click", (e)=>{
  /* 
    * Checks to see if "Start Game" button is pressed
    * Fade out overlay screen to reveal game board
    * Add random phrase to screen 
  */
  if(e.target.tagName === "A"){
    $(overlay).fadeOut(); // overlay.style.display = "none";
    overlay.lastElementChild.remove(); // prevents multiple taps & adding extra phrases
    addPhraseToDisplay(getRandomPhraseAsArray());
  }
});

const getRandomPhraseAsArray = ()=>{
  /* 
    * Get a random phrase, and split into characters in new array
    * Return new array.
  */
  let newPhrase = [];
  let randNum = Math.floor(Math.random() * phrasesArray.length);
  newPhrase = phrasesArray[randNum].split("");
  return newPhrase;  
}

const addPhraseToDisplay = (arr)=>{
  /* 
    * Take in array of letters from random phrase
    * Create li elements for each letter and add to ul
    * Add "letter" class to each li that contains a letter
    * Else add "space" class if no letters
  */
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

const checkLetter = (pickedLetter)=>{  
  /* 
    * Function to check if any letters in phrase matches the picked letter by user
    * Add and remove "effect" class to matched letter for transition effect when correct letter
  */
  const letterClass = ul.querySelectorAll(".letter");
  let matchedLetter = "";

  letterClass.forEach(letter =>{
    if(letter.textContent.toLowerCase() === pickedLetter.toLowerCase()){
      letter.className = "show letter effect";
      setTimeout(()=>{
        letter.className = "show letter";
      }, 300);
      matchedLetter = letter.textContent;
    }
  });
  // return matchedLetter for qwerty event listener below
  if(matchedLetter !== ""){
    return matchedLetter;
  }else{
    return null;
  }
}

qwerty.addEventListener('click', (e)=>{
  /* 
    * Event listener for letter picked by user
    * Disables the letter that he user picks
    * Takes returned letter from checkedLetter function,
      and checks to see if letter correct
    * If not, removes a heart, and adds 1 to "missed" count
    * Run checkWin function
  */
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

const winOrLoseMessage = (message, result)=>{
  /* 
    * Message to display after win or loss
    * Takes in message parameter, and result for win or loss
    * Fades in overlay to display win or loss message above game title
  */
  const paragraph = document.createElement("p");
  const title = overlay.firstElementChild;
  paragraph.className= "message";
  paragraph.innerHTML = message;
  overlay.className = result;
  $(overlay).fadeIn();  // overlay.style.display = "";
  overlay.insertBefore(paragraph, title);
}

// Replace "Start Game" link with "Play Again!" button
const replaceButton = ()=>{
  const startButton = overlay.lastElementChild;
  startButton.remove();
  const restartButton = document.createElement("button");
  restartButton.textContent = "Play Again!";
  restartButton.className = "reset";
  overlay.appendChild(restartButton);
}

// Function to check if all letters are revealed
const checkWin = ()=>{

  replaceButton();

  const letters = document.querySelectorAll(".letter");
  const show = document.querySelectorAll(".show");

  // Check if number of shown letters matches number of total letters in phrase
  if(letters.length === show.length){

    // Add "winner" class to each letter to show letters in green box after all letters correct
    setTimeout(()=>{
      for(let i = 0; i < letters.length; i += 1){
        letters[i].className = "letter show winner";
      }
    }, 500); // <- This delay has to be longer than delay for transition in "checkLetter" function
    
    // Show win screen and take off "winner" class name
    setTimeout(()=>{
      for(let i = 0; i < letters.length; i += 1){
        letters[i].className = "letter show";
      }
      winOrLoseMessage("<p>Congratulations! You win! &#128513;</p>", "win");
      restartGame();
    }, 2500);   
  }

  // Show lose screen
  if(missed >= 5){
    winOrLoseMessage("<p>Sorry, you lose &#128542;</p>", "lose");
    restartGame();
  }
}

// Create new set of hearts by checking how many hearts are missing
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

// Restart game function
const restartGame = ()=>{

  // Event listener function if "Play Again" button is pressed
  overlay.addEventListener("click", (e)=>{
    if(e.target.tagName === "BUTTON"){

      // fade out win/loss screen
      $(overlay).fadeOut();

      // reset selected keys on keyboard, and make those keys selectable
      const chosenKey = document.querySelectorAll(".chosen");
      for(let i = 0; i < chosenKey.length; i += 1){
        chosenKey[i].className = "";
        chosenKey[i].disabled = false;
      }

      // remove old phrase
      while(ul.firstElementChild){
        ul.removeChild(ul.firstElementChild);
      }

      // remove the win/lose message
      if(overlay.firstElementChild.tagName === "P"){
        overlay.firstElementChild.remove();
      }

      // reset hearts and missed count
      // add new phrase to screen
      missed = 0;
      createHearts();
      addPhraseToDisplay(getRandomPhraseAsArray());
    }
  });
}