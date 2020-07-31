const buttonElement = document.querySelector("button");
const textElement = document.querySelector(".text");
const topDadElement = document.querySelector(".dad .top");

const sentences = [
  "Proud of you son.",
  "Way to go champ.",
  "Don't let the bedbugs bite.",
  "Don't forget to check your oil.",
  "Whaddaya need kiddo?",
  "Waste not want not.",
  "Don't tell your mother.",
  "A little bit of dirt never hurt anyone.",
  "They don’t make them like they used to.",
  "You working hard or hardly working?",
  "Hey son, go grab your old man another beer.",
  "Keep your eye on the ball.",
  "Another day another dollar.",
];

buttonElement.addEventListener("click", () => {
  textElement.innerHTML = "";
  let sentence = getRandomSentence();
  if ("speechSynthesis" in window) {
    textToSpeech(sentence);
  }
  printLetterByLetter(sentence);
});

const getRandomSentence = () => {
  return sentences[getRandomSentenceIndex()];
};

let previousIndex;
const getRandomSentenceIndex = () => {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  // ensures no two same sentences in a row
  if (randomIndex === previousIndex) {
    return getRandomSentenceIndex();
  }
  previousIndex = randomIndex;
  return randomIndex;
};

let interval;
function printLetterByLetter(str) {
  if (interval) {
    clearInterval(interval);
  }
  topDadElement.classList.add("speaking");
  let i = 0;
  interval = setInterval(function () {
    textElement.innerHTML += str.charAt(i);
    i++;
    if (i > str.length) {
      topDadElement.classList.remove("speaking");

      clearInterval(interval);
    }
  }, 50);
}

const utterance = new SpeechSynthesisUtterance();
window.speechSynthesis.onvoiceschanged = function () {
  const voices = window.speechSynthesis.getVoices();
  utterance.voice = voices[0];
};

function textToSpeech(str) {
  utterance.text = str;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
