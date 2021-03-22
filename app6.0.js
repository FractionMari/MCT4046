// This version is based upon Anders' pseudocode


// This code has an interface for uploading images, downscale them to  a 16x16 pixels image,
// and then extract the RGB values from all pixels. The RGB values are then mapped to a 
// frequencies played by a synth through a sequencer.
// The three RGB nots are mapped to one synth each, and plays a harmony through the 16 beat sequence

function clamp(min, max, val) {
    return Math.min(Math.max(min, +val), max);
  }
//Scaling any incoming number
function generateScaleFunction(prevMin, prevMax, newMin, newMax) {
    var offset = newMin - prevMin,
        scale = (newMax - newMin) / (prevMax - prevMin);
    return function (x) {
        return offset + scale * x;
        };
    };

let normalize = generateScaleFunction(-1, 1, 0, 1);   


// Sequencer code:

const keys = new Tone.Players({
    urls: {
        0: "A1.mp3",
        1: "Cs2.mp3",
        2: "E2.mp3",
        3: "Fs2.mp3",
    },
    fadeOut: "64n",
    baseUrl: "https://tonejs.github.io/audio/casio/"
}).toDestination();

document.querySelector("tone-play-toggle").addEventListener("start", () => Tone.Transport.start());
document.querySelector("tone-play-toggle").addEventListener("stop", () => Tone.Transport.stop());
document.querySelector("tone-slider").addEventListener("input", (e) => Tone.Transport.bpm.value = parseFloat(e.target.value));
document.querySelector("tone-step-sequencer").addEventListener("trigger", ({ detail }) => {
    keys.player(detail.row).start(detail.time, 0, "16t");
    
});

////////




const autoFilter = new Tone.AutoFilter("4n").toMaster();
autoFilter.type = "square3";
let gainNode = new Tone.Gain().connect(autoFilter);


gainNode.gain.value = 0.5;

const synth = new Tone.FMSynth().connect(gainNode);
const synth2 = new Tone.FMSynth().connect(gainNode);
const synth3 = new Tone.FMSynth().connect(gainNode);
const synth4 = new Tone.FMSynth().connect(gainNode);
const synth5 = new Tone.FMSynth().toMaster();
const synth6 = new Tone.FMSynth().toMaster();
const synth7 = new Tone.FMSynth().toMaster();
const synth8 = new Tone.FMSynth().toMaster();
const synth9 = new Tone.AMSynth().toMaster();
const synth10 = new Tone.AMSynth().toMaster();
const synth11 = new Tone.AMSynth().toMaster();
const synth12 = new Tone.AMSynth().toMaster();
const synth13 = new Tone.AMSynth().toMaster();
const synth14 = new Tone.AMSynth().toMaster();
const synth15 = new Tone.AMSynth().toMaster();
const synth16 = new Tone.AMSynth().toMaster();



let brightness = [];
let brightness2 = [];
let brightness3 = [];
let brightness4 = [];
let brightness5 = [];
let brightness6 = [];
let brightness7 = [];
let brightness8 = [];
let brightness9 = [];
let brightness10 = [];
let brightness11 = [];
let brightness12 = [];
let brightness13 = [];
let brightness14 = [];
let brightness15 = [];
let brightness16 = [];


// function for loading an image
    window.addEventListener('load', function() {
        document.querySelector('input[type="file"]').addEventListener('change', function() {
            if (this.files && this.files[0]) {
                var img1 = document.querySelector('img');
    cv = document.querySelector("#cv");
    c = cv.getContext("2d");
    
    pre1 = document.querySelector("pre1")
    pre2 = document.querySelector("pre2")
    pre3 = document.querySelector("pre3")
    pre = document.querySelector("pre")

    //img1 = new Image();
    img1.crossOrigin = "Anonymous"; // to bypass cors for imgur image link
    
    //img1.src = 'assets/colours.jpg';
    img1.src = URL.createObjectURL(this.files[0]); // set src to blob url
    
    img1.onload = function() {

        URL.revokeObjectURL(img1.src);  // no longer needed, free memory
        c.drawImage(img1, 0,0,scaledWidth, scaledHeight);
        var idata = c.getImageData(0, 0, scaledWidth, scaledHeight);
        getPixels(idata);

        //// code for pixelating 

        var width = scaledWidth * 37.5; // the size of the pixels
        var height = scaledHeight * 37.5;

      
        // Create canvas element.
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
      
        // This is what gives us that blocky pixel styling, rather than a blend between pixels.
        canvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0
                               'image-rendering: -moz-crisp-edges;' + // FireFox
                               'image-rendering: -o-crisp-edges;' +  // Opera
                               'image-rendering: -webkit-crisp-edges;' + // Chrome
                               'image-rendering: crisp-edges;' + // Chrome
                               'image-rendering: -webkit-optimize-contrast;' + // Safari
                               'image-rendering: pixelated; ' + // Future browsers
                               '-ms-interpolation-mode: nearest-neighbor;'; // IE
      
        // Grab the drawing context object. It's what lets us draw on the canvas.
        var context = canvas.getContext('2d');
      
        // Use nearest-neighbor scaling when images are resized instead of the resizing algorithm to create blur.
        context.webkitImageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

      
        // Render image smaller.
        context.drawImage(img1, 0, 0, scaledWidth, scaledHeight);
      
        // Stretch the smaller image onto larger context.
        context.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height);
      
        // Here are what the above parameters mean:
        // canvasElement, canvasXOffsetForImage, canvasYOffsetForImage, imageWidth, imageHeight, imageXOffset, imageYOffset, destinationImageWidth, destinationImageHeight
      
        // Append canvas to body.
        pre.appendChild(canvas);
        
    };
      
    
}   


function getPixels(imgData) {
    // get colors rgba (4 pix sequentially)
    
    var count=1;
    //var msg = '';
    var rValues = [];
    var gValues = [];
    var bValues = [];
    var highest = [];
    var lowest = [];
    let row1 = [];
    let row2 = [];
    let row3 = []; // brightness
    let warmColours = [];

    for (var i = 0; i < imgData.data.length; i += 4) {
        //msg += "\npixel red " + count + ": " + imgData.data[i];
        //msg += "\npixel green " + count + ": " + imgData.data[i+1];
        //msg += "\npixel blue " + count + ": " + imgData.data[i+2];
        //msg += "\npixel alpha " + count + ": " + imgData.data[i+3] + "\n";
        rValues += Math.floor(imgData.data[i]/2) + " ";
        gValues += Math.floor(imgData.data[i+1]/2) + " ";
        bValues += Math.floor(imgData.data[i+2]/2) + " ";

       

        row1 += Math.floor((imgData.data[i]*0.299) + (imgData.data[i+1]*0.587) + (imgData.data[i+2]*0.114) * 0.5) + " ";
        row2 += Math.floor((imgData.data[i]*0.299) + (imgData.data[i+1]*0.587) + (imgData.data[i+2]*0.114) * -0.5) + " ";
        row3 += (((imgData.data[i]) + (imgData.data[i+1]) + (imgData.data[i+2])) / 765 ) * 0.9 + " ";


        warmColours += normalize((imgData.data[i] - imgData.data[i+2]) / 255) + " ";
        warmColours += (clamp(0, 1, warmColours));

// Getting brightness values of pixels:
        highest = Math.max((imgData.data[i]), (imgData.data[i+1]), (imgData.data[i+2]) );
        lowest = Math.min((imgData.data[i]), (imgData.data[i+1]), (imgData.data[i+2]) );
        brightness += ((highest + lowest) / 2 / 255) + " ";
      
    
        count++;  
    }   

    // processing warmColours
//console.log(warmColours);
warmColours = warmColours.split(" ");
warmColours.pop();
let warmColours1 = sliceAndMultiply(0, warmColours);
console.log(warmColours1);
// scaling the number

let warmColours2 = sliceAndMultiply(1, warmColours);
let warmColours3 = sliceAndMultiply(2, warmColours);
let warmColours4 = sliceAndMultiply(3, warmColours);
let warmColours5 = sliceAndMultiply(4, warmColours);
let warmColours6 = sliceAndMultiply(5, warmColours);

// converting brightnessvalue to array:
brightness = brightness.split(" ");
brightness.pop();

//converting rValues to array:
rValues = rValues.split(" ");
rValues.pop();



// SYNTHESIZE img 
//if (scaledHeight === 1)
/// ROW 1
row1 = row1.split(" ");
row1.pop();
console.log(row1);
//tar bare den øverste linja
row1 = sliceAndMultiply(0, row1);
console.log(row1);
//konverterer til freqency
row1 = arrayToFreq(row1);
console.log(row1);

// ROW2 
row2 = row2.split(" ");
row2.pop();
console.log(row2);
//tar bare den øverste linja
row2 = sliceAndMultiply(0, row2);
console.log(row2);
//konverterer til freqency
row2 = arrayToFreq(row2);
console.log(row2);

// ROW3 
console.log(row3);
row3 = row3.split(" ");
row3.pop();
console.log(row3);
//tar bare den øverste linja
row3 = sliceAndMultiply(2, row3);
console.log(row3);
//konverterer til freqency






// Function that converts midi value to frequency:    
function arrayToFreq(array) {
    let a = 440; //frequency of A (coomon value is 440Hz)
    var newArray = [];

    for (var i = 0; i < array.length; i += 1) {

        if (array[i] > 0)
            newArray.push((a / 32) * (2 ** ((array[i] - 9) / 12)));
        else
            newArray.push(0);
    }   
    return newArray; 
}


// til i morgen: se om jeg kan ta hele greia inn i én funksjon.
function sliceAndMultiply(multiplyValue, array) {

    var number1 = scaledWidth * multiplyValue;
    var number2 = scaledWidth * multiplyValue + parseInt(scaledWidth);
    var output = array.slice(number1, number2);

    return output;
};

// brightness value determines note on/off.
function onOffValues(array, midivalue) {
    var onOffValue = [];
    for (var i = 0; i < array.length; i += 1) {

    if (array[i] < (sensiScale) )
        onOffValue.push(midivalue);
    else
        onOffValue.push(0);
   }
   return onOffValue;
};
console.log(sensiScale);

brightness1 = sliceAndMultiply(0, brightness);
console.log(brightness1);
brightness2 = sliceAndMultiply(1, brightness);
console.log(brightness2);
brightness3 = sliceAndMultiply(2, brightness);
console.log(brightness3);
brightness4 = sliceAndMultiply(3, brightness);
console.log(brightness4);
brightness5 = sliceAndMultiply(4, brightness);
console.log(brightness5);
brightness6 = sliceAndMultiply(5, brightness);
brightness7 = sliceAndMultiply(6, brightness);
brightness8 = sliceAndMultiply(7, brightness);
brightness9 = sliceAndMultiply(8, brightness);
brightness10 = sliceAndMultiply(9, brightness);
brightness11 = sliceAndMultiply(10, brightness);
brightness12 = sliceAndMultiply(11, brightness);
brightness13 = sliceAndMultiply(12, brightness);
brightness14 = sliceAndMultiply(13, brightness);
brightness15 = sliceAndMultiply(14, brightness);
brightness16 = sliceAndMultiply(15, brightness);


brightness1 = onOffValues(brightness1, 72);
brightness2 = onOffValues(brightness2, 71);
brightness3 = onOffValues(brightness3, 69);
brightness4 = onOffValues(brightness4, 67);
brightness5 = onOffValues(brightness5, 65);
brightness6 = onOffValues(brightness6, 64);
brightness7 = onOffValues(brightness7, 62);
brightness8 = onOffValues(brightness8, 60);
brightness9 = onOffValues(brightness9, 59);
brightness10 = onOffValues(brightness10, 57);
brightness11 = onOffValues(brightness11, 55);
brightness12 = onOffValues(brightness12, 53);
brightness13 = onOffValues(brightness13, 52);
brightness14 = onOffValues(brightness14, 50);
brightness15 = onOffValues(brightness15, 48);
brightness16 = onOffValues(brightness16, 47);
console.log(brightness1);
console.log(brightness2);
console.log(brightness3);
console.log(brightness4);
console.log(brightness5);

brightness1 = arrayToFreq(brightness1);
console.log(brightness1);
brightness2 = arrayToFreq(brightness2);
console.log(brightness2);
brightness3 = arrayToFreq(brightness3);
console.log(brightness3);
brightness4 = arrayToFreq(brightness4);
console.log(brightness4);
brightness5 = arrayToFreq(brightness5);
console.log(brightness5);
brightness6 = arrayToFreq(brightness6);
brightness7 = arrayToFreq(brightness7);
brightness8 = arrayToFreq(brightness8);
brightness9 = arrayToFreq(brightness9);
brightness10 = arrayToFreq(brightness10);
brightness11 = arrayToFreq(brightness11);
brightness12 = arrayToFreq(brightness12);
brightness13 = arrayToFreq(brightness13);
brightness14 = arrayToFreq(brightness14);
brightness15 = arrayToFreq(brightness15);
brightness16 = arrayToFreq(brightness16);
    


/* rgbValues = imgData.data;

// converting gValues to array:
gValues = gValues.split(" ");
gValues.pop();
gValues = arrayToFreq(gValues);

// converting bValues to array:
bValues = bValues.split(" ");
bValues.pop();
bValues = arrayToFreq(bValues);
     */

/* let counter = 0;
let counterArray= [];
while (counter <= 15) {
    counter = counter + 1;
    counterArray.push(counter);
}
console.log(counterArray); */

const seq = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, sustain, time);

var time2 = time * 4;
console.log(time2);

var i = Math.floor(time2 % row3.length);

//if (i > row1.length) i = 0;


console.log(time);
console.log(i);
gainNode.gain.rampTo(row3[i], 0.2);
autoFilter.wet.value = warmColours1[i];
//gainNode.gain.value = row3[i];
console.log(autoFilter.wet.value);
console.log(gainNode.gain.value);


    // subdivisions are given as subarrays
}, row1).start(0);

const seq2 = new Tone.Sequence((time, note) => {
    synth2.triggerAttackRelease(note, sustain, time);


    // subdivisions are given as subarrays
}, row2).start(0);

const seq3 = new Tone.Sequence((time, note) => {
    synth3.triggerAttackRelease(note, sustain, time);

    // subdivisions are given as subarrays
}, brightness3).start(0);

const seq4 = new Tone.Sequence((time, note) => {
    synth4.triggerAttackRelease(note, sustain, time);

    // subdivisions are given as subarrays
}, brightness4).start(0);

const seq5 = new Tone.Sequence((time, note) => {
    synth5.triggerAttackRelease(note, sustain, time);

    // subdivisions are given as subarrays
}, brightness5).start(0);

const seq6 = new Tone.Sequence((time, note) => {
    synth6.triggerAttackRelease(note, 0.1, time);

    // subdivisions are given as subarrays
}, brightness6).start(0);

const seq7 = new Tone.Sequence((time, note) => {
    synth7.triggerAttackRelease(note, 0.1, time);

    // subdivisions are given as subarrays
}, brightness7).start(0);

const seq8 = new Tone.Sequence((time, note) => {
    synth8.triggerAttackRelease(note, 0.2, time);

    // subdivisions are given as subarrays
}, brightness8).start(0);

const seq9 = new Tone.Sequence((time, note) => {
    synth9.triggerAttackRelease(note, 0.2, time);

    // subdivisions are given as subarrays
}, brightness9).start(0);

const seq10 = new Tone.Sequence((time, note) => {
    synth10.triggerAttackRelease(note, 0.2, time);

    // subdivisions are given as subarrays
}, brightness10).start(0);

const seq11 = new Tone.Sequence((time, note) => {
    synth11.triggerAttackRelease(note, 0.2, time);

    // subdivisions are given as subarrays
}, brightness11).start(0);

const seq12 = new Tone.Sequence((time, note) => {
    synth12.triggerAttackRelease(note, 0.2, time);

    // subdivisions are given as subarrays
}, brightness12).start(0);

const seq13 = new Tone.Sequence((time, note) => {
    synth13.triggerAttackRelease(note, 0.2, time);

    // subdivisions are given as subarrays
}, brightness13).start(0);

const seq14 = new Tone.Sequence((time, note) => {
    synth14.triggerAttackRelease(note, 0.2, time);

    // subdivisions are given as subarrays
}, brightness14).start(0);

const seq15 = new Tone.Sequence((time, note) => {
    synth15.triggerAttackRelease(note, 0.2, time);

    // subdivisions are given as subarrays
}, brightness15).start(0);

const seq16 = new Tone.Sequence((time, note) => {
    synth16.triggerAttackRelease(note, 0.2, time);

    // subdivisions are given as subarrays
}, brightness16).start(0);
    
    //console.log(imgData.height);
    //console.log(imgData.data.length);
/*     pre1.innerText = ("Red values array: " + rValues);       
    pre2.innerText = ("Green values array: " + gValues);       
    pre3.innerText = ("Blue values array: " + bValues);   */
}

            

});
});