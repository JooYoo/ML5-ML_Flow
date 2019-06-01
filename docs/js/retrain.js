var video = document.getElementById('video');
// var videoStatus = document.getElementById('video-status');
// var loading = document.getElementById('loading');
var deviceZero = document.getElementById('btn-device0');
var deviceOne = document.getElementById('btn-device1');
var aBtn = document.getElementById('btn-a');
var bBtn = document.getElementById('btn-b');
var train = document.getElementById('btn-train');
var loss = document.getElementById('loss');
var result = document.getElementById('canvas-result');
// var predict = document.getElementById('btn-predict');
var save = document.getElementById('btn-save');
var load = document.getElementById('btn-load');
var progress = document.getElementById('progress-percent');
var line0= document.getElementById("line-0");
var line1= document.getElementById("line-1");
var line2= document.getElementById("line-2");
var line3= document.getElementById("line-3");
var line4= document.getElementById("line-4");

let totalloss = 0;
let classifier;
var iDevices = [];
var deviceIndex = 0;
var trainCount = 0;

getVideo();

function getVideo() {
    // List input device IDs.
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.error("enumerateDevices() not supported.");
    }
    navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
            devices.forEach(function (device) {
                //console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
                if (device.kind == "videoinput") {
                    iDevices.push(device.deviceId);
                }
            })
        })
        .catch(function (err) {
            console.error(err.name + ": " + err.message);
        })
        .then(function () {   // get stream from webcam
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({
                    video: {
                        deviceId: { exact: iDevices[deviceIndex] }
                    }
                }).then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                });
            }
        });
}


// video signal changeabel
deviceZero.onclick = function () {
    deviceIndex = 0;
    getVideo();
}
deviceOne.onclick = function () {
    deviceIndex = 1;
    getVideo();
}

// extract features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', function () {
    // loading.innerText = "Model Ready";

    UIkit.notification({
        message: 'Model Ready',
        status: 'primary',
        pos: 'bottom-right',
        timeout: 5000
    });

    classifier = featureExtractor.classification(video, function () {
        // videoStatus.innerText = "Video Ready";
        UIkit.notification({
            message: 'Video Ready',
            status: 'primary',
            pos: 'bottom-right',
            timeout: 5000
        });
    });
});

// add LabelA
function addLabelA() {
    classifier.addImage('Standby');
    takeScreenshotA();
}

// add LabelB
function addLabelB() {
    classifier.addImage('Hand');
    takeScreenshotB();
}

// train
train.onclick = function () {
    classifier.train(function (lossValue) {
        if (lossValue) {
            trainCount++;
            getProgress(trainCount);
            totalloss = lossValue;
           // loss.innerHTML += "loss: " + totalloss + "<br>";
        } else {
            //loss.innerHTML += "Done ! Final Loss:" + totalloss;
            colorConnector();
            classifier.classify(gotResults);
        }
    });
}

// progressbar
function getProgress(trainCount) {
    progress.style.width = ((100 * trainCount) / 60).toString() + "%";
}

function colorConnector(){
    line0.style.borderColor = "#0275d8";
    line1.style.borderColor = "#0275d8";
    line2.style.borderColor = "#0275d8";
    line3.style.borderColor = "#0275d8";
    line4.style.borderColor = "#0275d8";

}

// predict result
// predict.onclick = function () {
//     classifier.classify(gotResults);
// }
function gotResults(err, data) {
    if (err) {
        console.error(err);
    }
    result.innerText = data;
    classifier.classify(gotResults);
}

// save model
save.onclick = function () {
    save.innerText = "SAVED";
    classifier.save("trainedModel");
}

// load model
load.onclick = function () {
    load.innerHTML = "LOADED";
    classifier.load("./model/model.json");
    classifier.classify(gotResults);
}