hourStep = Math.PI * 2 / 12;
houtMinuteStep = hourStep / 60;
minuteStep = Math.PI * 2 / 60;
minuteSecondeStep = minuteStep / 60;
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
timer = document.getElementById("timer");
isStop = false;
backColor = {
    'singapore': '#000000',
    'joburg': '#000000',
    'dubai': '#000000',
    'kingston': '#000000',
    'newyork': '#113D83',
    'monaco': '#000000',
};

window.onload = function () {
    backgroundColor = document.getElementById("color").value
    selectWatch = document.getElementById('watch').value;

    imgMontre = new Image();
    imgHeure = new Image();
    imgMinute = new Image();
    imgMontre.src = `img/${selectWatch}/montre.png`;
    imgHeure.src = `img/${selectWatch}/heure.png`;
    imgMinute.src = `img/${selectWatch}/minute.png`;
    let now = new Date();

    timer.value = `${now.getHours() < 10 ? '0' : ''}${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
    interval = window.setInterval(draw, 1000);
};

function draw(time = 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawImage(imgMontre);
    let now = new Date();
    if (time != 0) {
        now = new Date(now.toDateString() + ' ' + time);
    }

    if (!isStop) {
        timer.value = `${now.getHours() < 10 ? '0' : ''}${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
    }

    drawImage(imgHeure, hourMinuteToAngle(now.getHours(), now.getMinutes()));

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


function hourMinuteToAngle(hour, minute) {
    hour = (hour > 12) ? hour - 12 : hour;
    return hour * hourStep + minute * houtMinuteStep;
}

function minuteToAngle(minute, second) {
    return minute * minuteStep + second * minuteSecondeStep;
}


function manageTimer() {
    window.clearInterval(interval);
    draw(timer.value);
}

function restart() {
    isStop = false;
    draw();
    interval = window.setInterval(draw, 1000);
}

function clickTime() {
    isStop = true;
}

function changeWatch(watch) {
    //backgroundColor = backColor[watch];
    imgMontre.src = `img/${watch}/montre.png`;
    imgHeure.src = `img/${watch}/heure.png`;
    imgMinute.src = `img/${watch}/minute.png`;
}
