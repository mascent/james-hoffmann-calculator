window.onload = function () {

    var seconds = 00;
    var tens = 00;
    var minutes = 00;
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var appendMinutes = document.getElementById("minutes")
    var buttonStart = document.getElementById('button-start');
    var buttonReset = document.getElementById('button-reset');
    var stopWatchInterval;
    var running = false;

    buttonStart.onclick = function () {

        clearInterval(stopWatchInterval);
        if (!running) {
            stopWatchInterval = setInterval(startTimer, 10);
            running = true;
            return;
        }
        running = false;
    }


    buttonReset.onclick = function () {
        clearInterval(stopWatchInterval);
        tens = "00";
        seconds = "00";
        minutes = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
        appendMinutes.innerHTML = minutes;
        running = false;
    }



    function startTimer() {
        tens++;

        if (tens <= 9) {
            appendTens.innerHTML = "0" + tens;
        }

        if (tens > 9) {
            appendTens.innerHTML = tens;

        }

        if (tens > 99) {
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }

        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }
        if (seconds > 59) {
            minutes++;
            if (minutes > 9) {
                appendMinutes.innerHTML = minutes;
            } else {
                appendMinutes.innerHTML = "0" + minutes;
            }
            seconds = 0;
            appendSeconds.innerHTML = "0" + 0;
        }

    }


}