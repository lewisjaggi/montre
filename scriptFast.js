hourStep = Math.PI * 2 / 12;
hourMinuteStep = hourStep / 60;
hourSecondeStep = hourMinuteStep / 60;
minuteStep = Math.PI * 2 / 60;
minuteSecondeStep = minuteStep / 60;
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
backgroundColor  ="#000000"
selectWatch = 'singapore'
now = new Date();

window.onload = function () {

    imgMontre = new Image();
    imgHeure = new Image();
    imgMinute = new Image();
    imgMontre.onload = () =>  {
        imgHeure.onload = () =>{

            imgMinute.src = `img/${selectWatch}/minute.png`;
        }
        imgHeure.src = `img/${selectWatch}/heure.png`;
    }
    imgMontre.src = `img/${selectWatch}/montre.png`;


    interval = window.setInterval(draw, 10);
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawImage(imgMontre);
    now.setSeconds(now.getSeconds()+6)

    drawImage(imgHeure, hourMinuteToAngle(now.getHours(), now.getMinutes(),now.getSeconds()));

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


function hourMinuteToAngle(hour, minute,seconde) {
    hour = (hour > 12) ? hour - 12 : hour;
    return hour * hourStep + minute * hourMinuteStep +seconde * hourSecondeStep;
}

function minuteToAngle(minute, second) {
    return minute * minuteStep + second * minuteSecondeStep;
}







