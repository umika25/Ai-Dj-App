song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
var belly_dancer="";
var bilionera="";
var runaway=""
var iko_iko="";
var harry_potter="";
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
    runaway=loadSound("AURORA-Runaway.mp3");
    harry_potter=loadSound("music.mp3");
    iko_iko=loadSound("IkoIko.mp3");
    bilionera=loadSound("BILIONERA.mp3");
    belly_dancer=loadSound("BellyDancer.mp3");
}

function setup(){
    canvas= createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded(){
    console.log("PoseNet is Initialized");
}
function gotPoses(){
    if(results.length>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist="+scoreLeftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX= "+leftWristX+"leftWristY= "+leftWristY);

        rightWristY=results[0].pose.rightWrist.y;
        rightWristX-results[0].pose.rightWrist.x;
        console.log("rightWristX= "+rightWristX+"righttWristY= "+rightWristY);
    }
}
function draw(){
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);

        InNumberleftWristY= Number(leftWristY);
        remove_decimals= floor(InNumberleftWristY);
        volume= remove_decimals/500;
        document.getElementById("volume").innerHTML= "Volume= "+volume;
        song.setVolume(volume);
    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY,20);
    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML="Speed = 0.5x";
        song.rate(0.5);
    }
    if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML="Speed = 1x";
        song.rate(1)
    }
    if(rightWristY > 200 && rightwristY <= 300){
        document.getElementById("speed").innerHTML="Speed = 1.5x";
        song.rate(1.5);
    }
    if(rightWristY > 300 && rightwristY <= 400){
        document.getElementById("speed").innerHTML="Speed = 2x";
        song.rate(2);
    }
    if(rightWristY > 400 && rightwristY <= 500){
        document.getElementById("speed").innerHTML="Speed = 2.5x";
        song.rate(2.5);
    }
    }

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate();
    var name=document.getElementById("song_options").value;
    if(name == "AURORA-Runaway"){
        runaway.play();
    }
    if(name == "BellyDancer"){
        belly_dancer.play();
    }
    if(name == "BILIONERA"){
        bilionera.play();
    }
    if(name == " IkoIko"){
        iko_iko.play();
    }
    if(name == "music"){
        harry_potter.play();
    }
    
}
function stop(){
    song.stop();
}
function pause(){
    song.pause();
}
