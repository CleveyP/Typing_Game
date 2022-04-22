
//speed and accuracy
let numMistakes = 0;
let mistakeP = document.getElementById("mistakes");
//let title = getElementByName("h1");

let completedSection="";
let text;
let letterCounter = 0;
let currentLetter;
let currentLine;
let lines;
let lineCounter = 0;
let output = document.getElementById("output");
let numlettersInFile;
//load in the local file
async function loadFile(file) {

    text = await (new Response(file)).text();
    //set the file content on the web page
    lines = text.split('\n');
    const imageUrl = lines.shift();
    //set background image
    document.body.style.backgroundImage = "url("+imageUrl+")";
    text = lines.join('\n');
    document.getElementById('output').textContent = text;
    numlettersInFile = text.length;
    currentLetter = text.charAt(letterCounter);
    
    currentLine = lines[lineCounter];
    document.body.addEventListener("keypress", startClock);
    $("input").fadeOut(1000);


  }

function displayResults(){
    stopClock();
    document.getElementById("results").classList.remove("invisible");
    let acc = 100 - Math.floor((numMistakes / text.length *100)); 
    document.getElementById("accuracy").innerHTML = "Your accuracy was: " + acc +"%.";
   // document.body.removeEventListener("keypress", checkLetter);
    displayWPM(numlettersInFile);
  }

  function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function checkLetter(e){
    if(e.key == currentLetter){
        completedSection += currentLetter;
        //reset span
        output.innerHTML = text;
        //change color of complte section
        letterCounter++;
        currentLetter = currentLine.charAt(letterCounter);
        output.innerHTML = output.innerHTML.replace((completedSection + currentLetter), '<span style="color: green;">'+completedSection+'</span>'+'<span style="background-color: hsla(265, 77%, 69%, .3);">'+ currentLetter + "</span>");
        
        // if the end of the line
        if(letterCounter == currentLine.length){
            letterCounter = 0;
            completedSection += "\n";
            lineCounter++;
            //if end of all text
            if(lineCounter == lines.length){
                displayResults();
                return;
            }
            currentLine = lines[lineCounter];
            currentLetter = currentLine.charAt(letterCounter);
        }
    }
    else {
        console.log("current letter: " +currentLetter);
        numMistakes++;
        mistakeP.innerHTML = `Number of mistakes: ${numMistakes}.`
    }
}



disableScroll();
//$("#overlay").hide();
document.body.addEventListener("keypress", checkLetter);



//stopwatch
let stopWatch;
let startTime;
let secondsPassed =0;
//let alarm;

const startClock = (e) =>{
  if(e.key == " " && !stopWatch){
  startTime = Date.now();
  stopWatch = setInterval(displayTime, 1000);
  startButton.disabled = true;

  }


}
const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () =>{
            startTime = Date.now();
            stopWatch = setInterval(displayTime, 1000);
            startButton.disabled = true;
            
            //alarm = parseInt(document.getElementById("alarm").value);
          //  cancelAnimationFrame(rAF);
        });

const stopClock = () =>{

           // stopTime = Date.now();
            clearInterval(stopWatch);
            startButton.disabled = false;
          //  cancelAnimationFrame(rAF);
    
        }
/* const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", ()=>{
            
            clearInterval(stopWatch);
            document.querySelector('.clock').textContent = "00:00:00";
            startButton.disabled = false;
            document.getElementById("alarm").value = "";
            secondsPassed=0;
            cancelAnimationFrame(rAF);
            draw();
        }) */
      function displayWPM(numLetters) {
        let minutes = Math.floor((secondsPassed % 3600) /60), 
        seconds =Math.floor(secondsPassed % 60);
       let numWords = Math.floor(numLetters /5);
        document.getElementById("wpm").innerHTML = "Your words per minute: " + (numWords/(secondsPassed/60));
        stopClock();
        }

        function displayTime() {
            let minutes = Math.floor((secondsPassed % 3600) /60), 
            seconds =Math.floor(secondsPassed % 60),
            hours = Math.floor(secondsPassed/ 3600);
            document.querySelector('#clock').textContent = `0${hours}:0${minutes}:${seconds}`;
            secondsPassed++;
          }
        
      