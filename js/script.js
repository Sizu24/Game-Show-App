// Global variables
const qwerty = document.querySelector("#querty");
const phrase = document.querySelector("#phrase");
const ul = phrase.firstElementChild;
let missed = 0;
const overlay = document.querySelector("#overlay");
let array = [
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
});

// Get a random phrase, and split into characters in new array
const getRandomPhraseAsArray = (arr)=>{

  let newPhrase = [];
  let randNum = Math.floor(Math.random() * arr.length);
  newPhrase = arr[randNum].split("");
  return newPhrase;
  
}

const randomArray = getRandomPhraseAsArray(array);
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
addPhraseToDisplay(randomArray);

