hourStep = Math.PI * 2 / 12;
hourMinuteStep = hourStep / 60;
hourSecondeStep = hourMinuteStep / 60;
minuteStep = Math.PI * 2 / 60;
minuteSecondeStep = minuteStep / 60;
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
timer = document.getElementById("timer");
buttonFast = document.getElementById('fast')
isStop = false;
now = new Date();
isFast = false;

/*backColor = {
    'singapore': '#000000',
    'joburg': '#000000',
    'dubai': '#000000',
    'kingston': '#000000',
    'newyork': '#000000',
    'monaco': '#000000',
};*/

window.onload = function () {
    backgroundColor = document.getElementById("color").value
    selectWatch = document.getElementById('watch').value;

    imgMontre = new Image();
    imgHeure = new Image();
    imgMinute = new Image();
    imgMontre.onload = () => {
        imgHeure.onload = () => {
            imgMinute.onload = () => {
                if (isStop) draw(timer.value);
            }
            imgMinute.src = `img/${selectWatch}/minute.png`;
        }
        imgHeure.src = `img/${selectWatch}/heure.png`;
    }
    imgMontre.src = `img/${selectWatch}/montre.png`;

    timer.value = `${now.getHours() < 10 ? '0' : ''}${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;

    interval = window.setInterval(draw, 1000);
};

function draw(time = 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawImage(imgMontre);

    if (time != 0) {
        now = new Date(now.toDateString() + ' ' + time);
    } else if (isFast) {
        now.setSeconds(now.getSeconds() + 6)
    } else if (!isStop) {
        now = new Date();
    }

    if (!isStop) {
        timer.value = `${now.getHours() < 10 ? '0' : ''}${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
    }

    drawImage(imgHeure, hourMinuteToAngle(now.getHours(), now.getMinutes(), now.getSeconds()));

    drawImage(imgMinute, minuteToAngle(now.getMinutes(), now.getSeconds()));

}

function scalePreserveAspectRatio(imgW, imgH, maxW, maxH) {
    return (Math.min((maxW / imgW), (maxH / imgH)));
}

function drawImage(img, angle = 0) {

    ctx.save();
    let w = img.width;
    let h = img.height;

    let sizer = scalePreserveAspectRatio(w, h, canvas.width, canvas.height);

    if (angle) {
        ctx.translate((w * sizer) / 2, (h * sizer) / 2);
        ctx.rotate(angle);
        ctx.translate(-(w * sizer) / 2, -(h * sizer) / 2);
    }

    ctx.drawImage(img, 0, 0, w, h, 0, 0, w * sizer, h * sizer);
    ctx.restore();
}


function hourMinuteToAngle(hour, minute, seconde) {
    hour = (hour > 12) ? hour - 12 : hour;
    return hour * hourStep + minute * hourMinuteStep + seconde * hourSecondeStep;
}

function minuteToAngle(minute, second) {
    return minute * minuteStep + second * minuteSecondeStep;
}


function manageTimer() {
    window.clearInterval(interval);
    buttonFast.value = 'Fast'
    isFast = false;
    draw(timer.value);
}

function restart() {
    window.clearInterval(interval);
    buttonFast.value = "Fast";
    isFast = false;
    isStop = false;
    draw();
    interval = window.setInterval(draw, 1000);
}

function clickTime() {
    isStop = true;
}

function changeWatch(watch) {
    backgroundColor = '#000000';
    document.getElementById("color").value = '#000000'


    if (isStop) draw(timer.value);

    imgMontre.src = `img/${watch}/montre.png`;


}

function changeColor(color) {
    backgroundColor = color;
    if (isStop) {
        draw(timer.value);
    } else {
        draw();
    }

}

function fast() {
    isFast = !isFast
    buttonFast.value = isFast ? 'Stop' : 'Fast';

    if (isFast) {
        window.clearInterval(interval)
        isStop = false;
        interval = window.setInterval(draw, 10)
    } else {
        window.clearInterval(interval)
    }

}
