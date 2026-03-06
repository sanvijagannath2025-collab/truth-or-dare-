const dramatic = document.getElementById("dramatic");
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const tick = document.getElementById("tick");

const options = [
"Truth","Dare","Truth","Dare",
"Truth","Dare","Truth","Dare"
];

const colors = [

"#1184ab","#d60575",
"#1184ab","#d60575",
"#1184ab","#d60575",
"#1184ab","#d60575",
"#1184ab","#d60575",
"#1184ab","#d60575",
"#1184ab","#d60575",

];

const truths = [
"Who is your crush?",
"What is your biggest fear?",
"What is the most embarrassing thing you have done?",
"Have you ever lied to a close friend?",
"What secret have you never told anyone?",
"when was the last time you cried and why?",
"what is your biggest regret?",
"decribe urself in 3 words",
];

const dares = [
"Do 10 pushups.",
"Sing a song loudly.",
"Dance for 20 seconds.",
"Act like a cat for 15 seconds.",
"Do your best celebrity impression.",
"call ur crush and confess your feelings",
"do rampwalk across the room",
];

let arc = Math.PI*2/options.length;

let angle = 0;
let velocity = 0;
let spinning = false;
let lastSegment = 0;

function drawWheel(){

for(let i=0;i<options.length;i++){

let ang = angle + i*arc;

ctx.beginPath();
ctx.fillStyle = colors[i];

ctx.moveTo(250,250);
ctx.arc(250,250,250,ang,ang+arc);
ctx.fill();

ctx.save();

ctx.fillStyle="white";
ctx.font="22px Segoe UI";

ctx.translate(
250+Math.cos(ang+arc/2)*160,
250+Math.sin(ang+arc/2)*160
);

ctx.rotate(ang+arc/2+Math.PI/2);

ctx.fillText(options[i],-30,0);

ctx.restore();

}

}

function update(){

if(!spinning) return;

angle += velocity;

velocity *= 0.985;

ctx.clearRect(0,0,500,500);

drawWheel();

let degrees = (angle*180/Math.PI)%360;
let segment = Math.floor(degrees/(360/options.length));

if(segment !== lastSegment){

tick.currentTime=0;
tick.play();

lastSegment = segment;

}

if(velocity < 0.002){

spinning = false;
showResult();

}

requestAnimationFrame(update);

}

function spin(){

if(spinning) return;

velocity = Math.random()*0.3 + 0.35;

spinning = true;

update();

}

function showResult(){

let degrees=(angle*180/Math.PI)%360;

let index = Math.floor((360-degrees)/(360/options.length));

let result = options[index];

if(result==="Truth"){

let question = truths[Math.floor(Math.random()*truths.length)];

document.getElementById("result").innerText =
"Truth: " + question;

}else{

let task = dares[Math.floor(Math.random()*dares.length)];

document.getElementById("result").innerText =
"Dare: " + task;

}

}

drawWheel();