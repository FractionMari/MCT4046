// This code has an interface for uploading images, downscale them to  a 16x16 pixels image,
// and then extract the RGB values from all pixels. The RGB values are then mapped to a 
// frequencies played by a synth through a sequencer.
// The three RGB nots are mapped to one synth each, and plays a harmony through the 16 beat sequence
// The RGB values are divided by 2 and converted from MIDI note values to Frequencies.

const synth = new Tone.FMSynth().toMaster();
const synth2 = new Tone.FMSynth().toMaster();
const synth3 = new Tone.FMSynth().toMaster();

    window.addEventListener('load', function() {
        document.querySelector('input[type="file"]').addEventListener('change', function() {
            if (this.files && this.files[0]) {
                var img1 = document.querySelector('img');
    cv = document.querySelector("#cv");
    c = cv.getContext("2d");
    
    pre = document.querySelector("pre")
    pre2 = document.querySelector("pre2")
    pre3 = document.querySelector("pre3")

    //img1 = new Image();
    img1.crossOrigin = "Anonymous"; // to bypass cors for imgur image link
    
    //img1.src = 'assets/colours.jpg';
    img1.src = URL.createObjectURL(this.files[0]); // set src to blob url
    
    img1.onload = function() {
        URL.revokeObjectURL(img1.src);  // no longer needed, free memory
        c.drawImage(img1, 0,0,16,1);
        var idata = c.getImageData(0, 0, 16, 1);
        getPixels(idata);
        
    };
      
    
}   


function getPixels(imgData) {
    // get colors rgba (4 pix sequentially)
    
    var count=1;
    var msg = '';
    var rValues = [];
    var gValues = [];
    var bValues = [];
    for (var i = 0; i < imgData.data.length; i += 4) {
        msg += "\npixel red " + count + ": " + imgData.data[i];
        msg += "\npixel green " + count + ": " + imgData.data[i+1];
        msg += "\npixel blue " + count + ": " + imgData.data[i+2];
        msg += "\npixel alpha " + count + ": " + imgData.data[i+3] + "\n";
        rValues += Math.floor(imgData.data[i]/2) + " ";
        gValues += Math.floor(imgData.data[i+1]/2) + " ";
        bValues += Math.floor(imgData.data[i+2]/2) + " ";
        
        count++;  
    }   

    // Function that converts midi value to frequency:



    function arrayToFreq(array) {
        let a = 440; //frequency of A (coomon value is 440Hz)
        var newArray = [];

        for (var i = 0; i < array.length; i += 1) {

            newArray.push((a / 32) * (2 ** ((array[i] - 9) / 12)));
            
        }   
        return newArray; 
    }
    //console.log(imgData.data);
    //rValues = JSON.parse(rValues);

    // converting rValues to array:
    rValues = rValues.split(" ");
    rValues = arrayToFreq(rValues);
    console.log(rValues);

    rgbValues = imgData.data;
    //console.log(typeof(rgbValues));
    //console.log(rgbValues);
    // converting gValues to array:
    gValues = gValues.split(" ");
    gValues = arrayToFreq(gValues);
    
    // converting bValues to array:
    bValues = bValues.split(" ");
    bValues = arrayToFreq(bValues);
    

    const seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.1, time);

        // subdivisions are given as subarrays
    }, rValues).start(0);

    const seq2 = new Tone.Sequence((time, note) => {
        synth2.triggerAttackRelease(note, 0.1, time);

        // subdivisions are given as subarrays
    }, gValues).start(0);

    const seq3 = new Tone.Sequence((time, note) => {
        synth3.triggerAttackRelease(note, 0.1, time);

        // subdivisions are given as subarrays
    }, bValues).start(0);
    
    //console.log(imgData.height);
    //console.log(imgData.data.length);
    pre.innerText = ("Red values array: " + rValues);       
    pre2.innerText = ("Green values array: " + gValues);       
    pre3.innerText = ("Blue values array: " + bValues);  
}

            

// mute button
document.getElementById("play").addEventListener("click", function(){


    if(this.className == 'is-playing'){
        this.className = "";
        this.innerHTML = "STOP"
        Tone.Transport.start();
    }else{
    
        this.className = "is-playing";
        this.innerHTML = "PLAY";
        Tone.Transport.stop();
    
    }
    
    });// Code that converts 16x16 rgb values to a sequence, mapping rgb values to hertz.



});
});