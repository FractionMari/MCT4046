// This code has an interface for uploading images, downscale them to  a 16x16 pixels image,
// and then extract the RGB values from all pixels. The RGB values are then mapped to a 
// frequencies played by a synth through a sequencer.

const synth = new Tone.Synth().toMaster();


    window.addEventListener('load', function() {
        document.querySelector('input[type="file"]').addEventListener('change', function() {
            if (this.files && this.files[0]) {
                var img1 = document.querySelector('img');
    cv = document.querySelector("#cv");
    c = cv.getContext("2d");
    
    pre = document.querySelector("pre")

    //img1 = new Image();
    img1.crossOrigin = "Anonymous"; // to bypass cors for imgur image link
    
    //img1.src = 'assets/colours.jpg';
    img1.src = URL.createObjectURL(this.files[0]); // set src to blob url
    
    img1.onload = function() {
        URL.revokeObjectURL(img1.src);  // no longer needed, free memory
        c.drawImage(img1, 0,0,16,16);
        var idata = c.getImageData(0, 0, 16, 16);
        getPixels(idata);
        
    };
      
    
}   


function getPixels(imgData) {
    // get colors rgba (4 pix sequentially)
    
    var count=1;
    var msg = '';
    for (var i = 0; i < imgData.data.length; i += 4) {
        msg += "\npixel red " + count + ": " + imgData.data[i];
        msg += "\npixel green " + count + ": " + imgData.data[i+1];
        msg += "\npixel blue " + count + ": " + imgData.data[i+2];
        msg += "\npixel alpha " + count + ": " + imgData.data[i+3] + "\n";
        count++;
        
    }   
    //console.log(imgData.data);
    
    rgbValues = imgData.data;
    console.log(rgbValues);

    const seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.1, time);
        // subdivisions are given as subarrays
    }, rgbValues).start(0);
    
    //console.log(imgData.height);
    //console.log(imgData.data.length);
    pre.innerText = msg;            
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