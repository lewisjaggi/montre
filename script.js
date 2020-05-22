hourStep = Math.PI * 2 / 12;
houtMinuteStep = hourStep / 60;
minuteStep = Math.PI * 2 / 60;
minuteSecondeStep = minuteStep / 60;
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
timer = document.getElementById("timer");
backgroundColor = "#03EFFF";
srcImgMontre = 'montre.png'
srcImgHeure = 'heure.png'
srcImgMinute = 'minute.png'
isStop = false;

window.onload = function () {
    imgMontre = new Image();
    imgHeure = new Image();
    imgMinute = new Image();
    imgMontre.src = srcImgMontre;
    imgHeure.src = srcImgHeure;
    imgMinute.src = srcImgMinute;
    let now = new Date();

    timer.value = `${now.getHours()}:${now.getMinutes()}`;
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
        manageTimer(true);
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

function manageTimer(startDrawing) {
    if(startDrawing){
        let now = new Date();
        timer.value = `${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}`;
    }else{
        window.clearInterval(interval);
        draw(timer.value);
    }
}

function restart() {
    isStop = false;
    draw();
    interval = window.setInterval(draw, 1000);
}

function clickTime() {
    isStop = true;
}
