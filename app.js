//ToneJs

const gainNode = new Tone.Gain().toMaster();
const autoFilter = new Tone.AutoWah().connect(gainNode);
const synth = new Tone.AMSynth().connect(autoFilter);
gainNode.gain.value = 0;
synth.frequency.value = 440;


/// Pixelating code:

// Create new image element.
var image = new Image();

// Set an image.
image.src = 'assets/zappa.jpg';

// Append image to body.
document.body.appendChild(image);

// After image has been loaded in memory invoke a callback.
image.onload = imageLoaded;

// Image loaded callback.
function imageLoaded() {
  // Get the dimensions of loaded image.
  synth.triggerAttack(); 
  var width = image.clientWidth;
  var height = image.clientHeight;
  console.log(image);
  console.log(image.clientHeight);

  // Create canvas element.
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  console.log(width);
  console.log(image.clientHeight);

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

  // We'll be pixelating the image by 80% (20% of original size).
  var percent = 0.05;

  // Calculate the scaled dimensions.
  var scaledWidth = width * percent;
  var scaledHeight = height * percent;

  // Render image smaller.
  context.drawImage(image, 0, 0, scaledWidth, scaledHeight);

  // Stretch the smaller image onto larger context.
  context.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height);

  // Here are what the above parameters mean:
  // canvasElement, canvasXOffsetForImage, canvasYOffsetForImage, imageWidth, imageHeight, imageXOffset, imageYOffset, destinationImageWidth, destinationImageHeight

  // Append canvas to body.
  document.body.appendChild(canvas);

  //image.style.display = 'none';

  function pick2(event, destination) {
    var x = event.layerX;
    var y = event.layerY;
    var pixel = context.getImageData(x, y, 1, 1);
    var data = pixel.data;
  
      const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
      destination.style.background = rgba;
      destination.textContent = rgba;
      //console.log(data[0]);
      synth.frequency.value = (data[0]);
  
      return rgba;
  }

  canvas.addEventListener('mousemove', function(event) {
	pick2(event, hoveredColor2);
});
canvas.addEventListener('click', function(event) {
	pick2(event, selectedColor2);
});
}

var hoveredColor2 = document.getElementById('hovered-color');
var selectedColor2 = document.getElementById('selected-color');




