// This code has an interface for uploading images, downscale them to  a 16x16 pixels image,
// and then extract the RGB values from all pixels. The RGB values are then mapped to a 
// frequencies played by a synth through a sequencer.
// The three RGB nots are mapped to one synth each, and plays a harmony through the 16 beat sequence

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
///////

////////
const synth = new Tone.FMSynth().toMaster();
const synth2 = new Tone.FMSynth().toMaster();
const synth3 = new Tone.FMSynth().toMaster();
const synth4 = new Tone.FMSynth().toMaster();
const synth5 = new Tone.Synth().toMaster();
const synth6 = new Tone.Synth().toMaster();
const synth7 = new Tone.Synth().toMaster();
const synth8 = new Tone.Synth().toMaster();
const synth9 = new Tone.AMSynth().toMaster();
const synth10 = new Tone.AMSynth().toMaster();
const synth11 = new Tone.AMSynth().toMaster();
const synth12 = new Tone.AMSynth().toMaster();
const synth13 = new Tone.AMSynth().toMaster();
const synth14 = new Tone.AMSynth().toMaster();
const synth15 = new Tone.AMSynth().toMaster();
const synth16 = new Tone.AMSynth().toMaster();


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
    var msg = '';
    var rValues = [];
    var gValues = [];
    var bValues = [];
    var highest = [];
    var lowest = [];
    var brightnessArray = [];
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

    for (var i = 0; i < imgData.data.length; i += 4) {
        msg += "\npixel red " + count + ": " + imgData.data[i];
        msg += "\npixel green " + count + ": " + imgData.data[i+1];
        msg += "\npixel blue " + count + ": " + imgData.data[i+2];
        msg += "\npixel alpha " + count + ": " + imgData.data[i+3] + "\n";
        rValues += Math.floor(imgData.data[i]/2) + " ";
        gValues += Math.floor(imgData.data[i+1]/2) + " ";
        bValues += Math.floor(imgData.data[i+2]/2) + " ";


// Getting brightness values of pixels:
        highest = Math.max((imgData.data[i]), (imgData.data[i+1]), (imgData.data[i+2]) );
        lowest = Math.min((imgData.data[i]), (imgData.data[i+1]), (imgData.data[i+2]) );
        //brightness += ((highest + lowest) / 2 / 255) + " ";
        brightness += ((highest + lowest) / 2 / 255) + " ";
        brightness2 += Math.floor(((highest + lowest) / 2 / 255)) + " ";
        
    
        count++;  
    }   

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

    // converting brightnessvalue to array:
    brightness = brightness.split(" ");
    brightness.pop();
   // brightness = arrayToFreq(brightness);
    console.log(brightness);


    // brightness value determines note on/off.
/*    
let rValuesLine1; 
let rValuesLine2; 
let rValuesLine3; 
let rValuesLine4; 
let rValuesLine5; 
let rValuesLine6; 
let rValuesLine7; 
let rValuesLine8; 
let rValuesLine9; 
let rValuesLine10; 
let rValuesLine11; 
let rValuesLine12;
let rValuesLine13; 
let rValuesLine14; 
let rValuesLine15; 
let rValuesLine16;   */

function onOffValues(array, midivalue) {
    var onOffValue = [];
    for (var i = 0; i < array.length; i += 1) {

    if (array[i] < (sensiScale / (scaledHeight/6)) )
        onOffValue.push(midivalue);
    else
        onOffValue.push(0);
   }
   return onOffValue;
};


// til i morgen: se om jeg kan ta hele greia inn i én funksjon.
function sliceAndMultiply(multiplyValue) {

    var number1 = scaledWidth * multiplyValue;
    console.log(number1);
    var number2 = scaledWidth * multiplyValue + parseInt(scaledWidth);
    console.log(number2)
    var output = brightness.slice(number1, number2);

    return output;
};


brightness1 = sliceAndMultiply(0);
    console.log(brightness1);

brightness2 = sliceAndMultiply(1);
    console.log(brightness2);
brightness3 = sliceAndMultiply(2);
    console.log(brightness3);
brightness4 = sliceAndMultiply(3);
    console.log(brightness4);
    brightness5 = sliceAndMultiply(4);
    console.log(brightness5);


    brightness1 = onOffValues(brightness1, 72);
    brightness2 = onOffValues(brightness2, 71);
    brightness3 = onOffValues(brightness3, 69);
    brightness4 = onOffValues(brightness4, 67);
    brightness5 = onOffValues(brightness5, 65);
    brightness6 = onOffValues(brightness6, 64);
    brightness7 = onOffValues(brightness, 62);
    brightness8 = onOffValues(brightness, 60);
    brightness9 = onOffValues(brightness, 59);
    brightness10 = onOffValues(brightness, 57);
    brightness11 = onOffValues(brightness, 55);
    brightness12 = onOffValues(brightness, 53);
    brightness13 = onOffValues(brightness, 52);
    brightness14 = onOffValues(brightness, 50);
    brightness15 = onOffValues(brightness, 48);
    brightness16 = onOffValues(brightness, 47);
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
    
   // rValues = rValues.split(" ");
   // rValues.pop();
    //rValues = arrayToFreq(rValues);
    //console.log(rValues);


        // Function for getting out separate values for each line

    
/*         for (var i = 0; i < scaledWidth; i += 1 ) {
    rValuesLine1 += (brightness1[i]) + " ";
    rValuesLine2 += brightness2[i + scaledWidth * 1] + " ";
    rValuesLine3 += brightness3[i + scaledWidth * 2] + " ";
    rValuesLine4 += brightness4[i + scaledWidth * 3] + " ";
    rValuesLine5 += brightness5[i + scaledWidth * 4] + " ";
    rValuesLine6 += brightness6[i + scaledWidth * 5] + " ";
    rValuesLine7 += brightness7[i + scaledWidth * 6] + " ";
    rValuesLine8 += brightness8[i + scaledWidth * 7] + " ";
    rValuesLine9 += brightness9[i + scaledWidth * 8] + " ";
    rValuesLine10 += brightness10[i + scaledWidth * 9] + " ";
    rValuesLine11 += brightness11[i + scaledWidth * 10] + " ";
    rValuesLine12 += brightness12[i + scaledWidth * 11] + " ";
    rValuesLine13 += brightness13[i + scaledWidth * 12] + " ";
    rValuesLine14 += brightness14[i + scaledWidth * 13] + " ";
    rValuesLine15 += brightness15[i + scaledWidth * 14] + " ";
    rValuesLine16 += brightness16[i + scaledWidth * 15] + " ";

    
        };
 */
/*         console.log(rValuesLine1);
        console.log(rValuesLine2);

// Formatting of pixel arrays
        rValuesLine1 = rValuesLine1.split(" ");
        rValuesLine1.pop();
        rValuesLine1 = arrayToFreq(rValuesLine1);
        console.log(rValuesLine1);

        rValuesLine2 = rValuesLine2.split(" ");
        rValuesLine2.pop();
        rValuesLine2 = arrayToFreq(rValuesLine2);
        console.log(rValuesLine2);

        rValuesLine3 = rValuesLine3.split(" ");
        rValuesLine3.pop();
        rValuesLine3 = arrayToFreq(rValuesLine3);
console.log(rValuesLine3);
        rValuesLine4 = rValuesLine4.split(" ");
        rValuesLine4.pop();
        rValuesLine4 = arrayToFreq(rValuesLine4);
        console.log(rValuesLine4);
        rValuesLine5 = rValuesLine5.split(" ");
        rValuesLine5.pop();
        rValuesLine5 = arrayToFreq(rValuesLine5);

        rValuesLine6 = rValuesLine6.split(" ");
        rValuesLine6.pop();
        rValuesLine6 = arrayToFreq(rValuesLine6);

        rValuesLine7 = rValuesLine7.split(" ");
        rValuesLine7.pop();
        rValuesLine7 = arrayToFreq(rValuesLine7);

        rValuesLine8 = rValuesLine8.split(" ");
        rValuesLine8.pop();
        rValuesLine8 = arrayToFreq(rValuesLine8);

        rValuesLine9 = rValuesLine9.split(" ");
        rValuesLine9.pop();
        rValuesLine9 = arrayToFreq(rValuesLine9);

        rValuesLine10 = rValuesLine10.split(" ");
        rValuesLine10.pop();
        rValuesLine10 = arrayToFreq(rValuesLine10);

        rValuesLine11 = rValuesLine11.split(" ");
        rValuesLine11.pop();
        rValuesLine11 = arrayToFreq(rValuesLine11);

        rValuesLine12 = rValuesLine12.split(" ");
        rValuesLine12.pop();
        rValuesLine12 = arrayToFreq(rValuesLine12);

        rValuesLine13 = rValuesLine13.split(" ");
        rValuesLine13.pop();
        rValuesLine13 = arrayToFreq(rValuesLine13);

        rValuesLine14 = rValuesLine14.split(" ");
        rValuesLine14.pop();
        rValuesLine14 = arrayToFreq(rValuesLine14);

        rValuesLine15 = rValuesLine15.split(" ");
        rValuesLine15.pop();
        rValuesLine15 = arrayToFreq(rValuesLine15);

        rValuesLine16 = rValuesLine16.split(" ");
        rValuesLine16.pop();
        rValuesLine16 = arrayToFreq(rValuesLine16);

 */


    rgbValues = imgData.data;
    //console.log(typeof(rgbValues));
    //console.log(rgbValues);
    // converting gValues to array:
    gValues = gValues.split(" ");
    gValues.pop();
    gValues = arrayToFreq(gValues);
    
    // converting bValues to array:
    bValues = bValues.split(" ");
    bValues.pop();
    bValues = arrayToFreq(bValues);
    

    const seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, brightness1).start(0);

    const seq2 = new Tone.Sequence((time, note) => {
        synth2.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, brightness2).start(0);

    const seq3 = new Tone.Sequence((time, note) => {
        synth3.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, brightness3).start(0);

    const seq4 = new Tone.Sequence((time, note) => {
        synth4.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, brightness4).start(0);

    const seq5 = new Tone.Sequence((time, note) => {
        synth5.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, brightness5).start(0);

    const seq6 = new Tone.Sequence((time, note) => {
        synth6.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, rValuesLine6).start(0);

    const seq7 = new Tone.Sequence((time, note) => {
        synth7.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, rValuesLine7).start(0);

    const seq8 = new Tone.Sequence((time, note) => {
        synth8.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, rValuesLine8).start(0);

    const seq9 = new Tone.Sequence((time, note) => {
        synth9.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, rValuesLine9).start(0);

    const seq10 = new Tone.Sequence((time, note) => {
        synth10.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, rValuesLine10).start(0);

    const seq11 = new Tone.Sequence((time, note) => {
        synth11.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, rValuesLine11).start(0);

    const seq12 = new Tone.Sequence((time, note) => {
        synth12.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, rValuesLine12).start(0);

    const seq13 = new Tone.Sequence((time, note) => {
        synth13.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, rValuesLine13).start(0);

    const seq14 = new Tone.Sequence((time, note) => {
        synth14.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, rValuesLine14).start(0);

    const seq15 = new Tone.Sequence((time, note) => {
        synth15.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, rValuesLine15).start(0);

    const seq16 = new Tone.Sequence((time, note) => {
        synth16.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, rValuesLine16).start(0);
    
    //console.log(imgData.height);
    //console.log(imgData.data.length);
/*     pre1.innerText = ("Red values array: " + rValues);       
    pre2.innerText = ("Green values array: " + gValues);       
    pre3.innerText = ("Blue values array: " + bValues);   */
}

            

});
});