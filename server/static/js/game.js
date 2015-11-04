var canvas
var ctx

var socket = io();

var mapArray = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2]
    ];
var charImg = new Image();
charImg.src = "/static/img/hero.png"
charImg.speed = 256; // Pixels per second!
// char.pos.x = 10
// char.pos.Img = 10
charImg.width = 32
charImg.height = 32

var char = {
    pos : {
        x   :   10,
        y   :   10
    }
}


var user = {}

socket.emit("init", id)

socket.on("error", function(data) {
    console.log(data)
})

socket.on("return-init", function(data){
    console.log("Recieved users data from server")
    console.log(data)
    char = data
    char.img = new Image()
    char.img.src = "/static/img/hero.png"
    if (char.pos.x == 0){char.pos.x = 20}
    if (char.pos.y == 0){char.pos.y = 20}
    // if (char.pos.x == NaN){ char.pos.x = 20}
    // if (char.pos.y == NaN){ char.pos.y = 20}
    charImg.width = 32
    charImg.height = 32
    char.speed = 256
})

var loaded = {grass: false, sand: false, water: false}
    
var grass = new Image();
grass.src = "/static/img/grass.jpg";
grass.onload = function(){loaded.grass = true;}

var sand = new Image();
sand.src = "/static/img/sand.jpg";
sand.onload = function(){loaded.sand = true;}

var water = new Image();
water.src = "/static/img/water.jpg";
water.onload = function(){loaded.water = true}

var posX = 0;
var posY = 0;

var init = function(){
    for (var i = 0; i < mapArray.length; i++) {
        for (var j = 0; j < mapArray[i].length; j++){
            switch (mapArray[i][j]) {
                case 0:
                    ctx.drawImage(grass, posX, posY, 32, 32);
                    break;
                case 1:
                    ctx.drawImage(sand, posX, posY, 32, 32);
                    break;
                case 2:
                    ctx.drawImage(water, posX, posY, 32, 32);
                    break;
            }
            posX+=32
        }
        posX=0
        posY+=32
    }   
    posX = 0
    posY = 0
}

var render = function(){
    // Draws Char
    ctx.drawImage(charImg, char.pos.x, char.pos.y, charImg.width, charImg.height);
    
    // TIme for some UI
    
    // Char health bar background
    ctx.fillStyle = "#000"
    ctx.fillRect(20,20, 100, 20)
    
    // Char health bar
    ctx.fillStyle = "#FF0000"
    ctx.fillRect(20, 20, char.stat.hp, 20)
    
    
}


// Creates simple object
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

function emitPos(){
    socket.emit('new pos', {y: char.pos.y, x: char.pos.x, id: id, ping: Date.now()});
}

var update = function (modifier) {
	if (87 in keysDown && char.pos.y > 0 ) { // Player holding up
		char.pos.y -= char.speed * modifier;
		emitPos()
	}
	if (83 in keysDown && char.pos.y < (canvas.height - charImg.height)) { // Player holding down
		char.pos.y += char.speed * modifier;
		emitPos()
	}
	if (65 in keysDown && char.pos.x > 0) { // Player holding left
		char.pos.x -= char.speed * modifier;
		emitPos()
	}
	if (68 in keysDown && char.pos.x < (canvas.width - charImg.width)) { // Player holding right
		char.pos.x += char.speed * modifier;
		emitPos()
	}
}



var main = function() {
    var now = Date.now()
    var delta = now - then;

	update(delta / 1000);
	
// 	if(char.pos.x <= 0){char.pos.x=0}
// 	if(char.pos.x >= canvas.width){char.pos.x=(canvas.width - char.width)}
// 	if(char.pos.y <= 0){char.pos.y=0}
// 	if(char.pos.y >= canvas.height){char.pos.y=(canvas.height - char.height)}
	
	init()
	render();

	then = now;
	
	// Request to do this again ASAP
	requestAnimationFrame(main);
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then;

window.setTimeout(function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d"); 
    
    // init()
    // drawChar()
    then = Date.now();
    console.log("'then' defined now executing run!")
    main();
}, 3000);