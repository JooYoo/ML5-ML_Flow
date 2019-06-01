var aBtn = document.getElementById("btn-a");
var bBtn = document.getElementById("btn-b");
var sampleACount = document.getElementById("span-sampleA-count");
var sampleBCount = document.getElementById("span-sampleB-count");



// screenshot A
function takeScreenshotA() {
    console.log("clicked A");
    let canvas = document.createElement('canvas');
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;

    let canvasContext = canvas.getContext("2d");
    canvasContext.drawImage(
        video,
        0, 0,
        video.offsetWidth, video.offsetHeight
    );
    var container = document.getElementById('canvas-container-a');
    container.prepend(canvas);

    sampleACount.innerText = Number(sampleACount.innerText) + 1;
}


// screenshot B
function takeScreenshotB() {
    console.log("clicked B");
    let canvas = document.createElement('canvas');
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;

    let canvasContext = canvas.getContext("2d");
    canvasContext.drawImage(
        video,
        0, 0,
        video.offsetWidth, video.offsetHeight
    );
    var container = document.getElementById('canvas-container-b');
    container.prepend(canvas);

    sampleBCount.innerText = Number(sampleBCount.innerText) + 1;
}