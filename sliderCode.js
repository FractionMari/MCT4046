var scaledHeight = 1;
var scaledWidth = 16;
var sensiScale = 0.2;
var sustain = 0.1;


let heightslider = document.getElementById("scaledHeight");
let witdthslider = document.getElementById("scaledWidth");
let sensitivity = document.getElementById("sensitivity");
let sustainSlider = document.getElementById("sustain");
let volumeSlider = document.getElementById("volume");

const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

witdthslider.oninput = function() {
    scaledWidth = this.value;

    }

heightslider.oninput = function() {
    scaledHeight= this.value;

    }

sensitivity.oninput = function() {
  sensiScale = this.value;

  }

sustainSlider.oninput = function() {
  sustain = this.value;

  }

volumeSlider.oninput = function() {
  gainNode.gain.value = this.value;

  }