let stopWatch;
        let startTime;
        let secondsPassed =0;
        let alarm;
        const startButton = document.getElementById("start");
        startButton.addEventListener("click", () =>{
            startTime = Date.now();
            stopWatch = setInterval(displayTime, 1000);
            startButton.disabled = true;
            alarm = parseInt(document.getElementById("alarm").value);
            cancelAnimationFrame(rAF);
        });

        const stopButton = document.getElementById("stop");
        stopButton.addEventListener("click", () => {
            stopTime = Date.now();
            clearInterval(stopWatch);
            startButton.disabled = false;
            cancelAnimationFrame(rAF);
            draw();
        });
        const resetButton = document.getElementById("reset");
        resetButton.addEventListener("click", ()=>{
            
            clearInterval(stopWatch);
            document.querySelector('.clock').textContent = "00:00:00";
            startButton.disabled = false;
            document.getElementById("alarm").value = "";
            secondsPassed=0;
            cancelAnimationFrame(rAF);
            draw();
        })
      function displayTime() {
        let time = (Date.now()-startTime);
        let minutes = Math.floor((secondsPassed % 3600) /60), 
        seconds =Math.floor(secondsPassed % 60),
        hours = Math.floor(secondsPassed/ 3600);
        document.querySelector('#wmp').textContent = `0${hours}:0${minutes}:${seconds}`;
        secondsPassed++;
      }