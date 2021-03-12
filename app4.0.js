// Code that converts 16x16 rgb values to a sequence, mapping rgb values to hertz.
const synth = new Tone.Synth().toMaster();

 

var rgbValues = "";
onload = init;

function init() {
    cv = document.querySelector("#cv");
    c = cv.getContext("2d");
    
    pre = document.querySelector("pre")

    img1 = new Image();
    img1.crossOrigin = "Anonymous"; // to bypass cors for imgur image link
    
    img1.src = 'assets/colours.jpg';
    
    img1.onload = function() {
        c.drawImage(img1, 0,0,16,16);
        var idata = c.getImageData(0, 0, 16, 16);
        getPixels(idata);
    };
    
    
    
}   


function getPixels(imgData) {
    // get colors rgba (4 pix sequentially)
    
    var saveData 
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

/* // save to txt file function
function saveStaticDataToFile() {
                var blob = new Blob([rgbValues],
                    { type: "text/plain;charset=utf-8" });
                saveAs(blob, "static.txt");
            } */
            

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
    
    
    
    });