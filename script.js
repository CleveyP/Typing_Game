
//speed and accuracy
let numMistakes = 0;
let mistakeP = document.getElementById("mistakes");

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
    document.getElementById('output').textContent = text;
    numlettersInFile = text.length;
    currentLetter = text.charAt(letterCounter);
    lines = text.split('\n');
    currentLine = lines[lineCounter];
    $("input").fadeOut(1000);

  }

function displayResults(){

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
        output.innerHTML = output.innerHTML.replace(completedSection, '<span style="color: red;">'+completedSection+'</span>');
        letterCounter++;
        currentLetter = currentLine.charAt(letterCounter);
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
        let time = (Date.now()-startTime);
        let minutes = Math.floor((secondsPassed % 3600) /60), 
        seconds =Math.floor(secondsPassed % 60);
       let numWords = Math.floor(numLetters /5);
       console.log(numLetters);
        document.getElementById("wpm").innerHTML = "Your words per minute: " + (numWords/(secondsPassed/60));
        stopClock();
        }

        function displayTime() {
            let time = (Date.now()-startTime);
            let minutes = Math.floor((secondsPassed % 3600) /60), 
            seconds =Math.floor(secondsPassed % 60),
            hours = Math.floor(secondsPassed/ 3600);
            document.querySelector('#clock').textContent = `0${hours}:0${minutes}:${seconds}`;
            secondsPassed++;
          }
      