// events and listeners
document.addEventListener("keydown", onKeyDownEvent);
document.addEventListener("keyup", onKeyUpEvent);
window.addEventListener("load", setup);

// canvas variables
let canvas = document.getElementById("canv");
    ctx = canvas.getContext("2d"); // this had to get moved to GUIManager
let _width = canvas.width;
let _height = canvas.height;

// game state variables
const FPS = 60, FPS_INVERSE = 1000/FPS;
let lastFrame = new Date().getTime(), deltaTime = 0;
let startTime = new Date().getTime(), elapsedTime = startTime;

// input variables
let itemAction = false;
let keys = [];

// object variables
    player = new Player(new Vector2(128, 128), new Vector2(32, 32));
let waterwell = new Building(new Vector2(16, 128), new Vector2(64, 64), 70);
let composter = new Building(new Vector2(128, 16), new Vector2(64, 64), 70);
let market = new Building(new Vector2(256, 16), new Vector2(128, 64), 80);
let soil = [];
let colliders = [];
let items = [];
let particles = [];

// game variables
let moveSpeed = 4;
let scale = new Vector2(2, 2);
let camSize = new Vector2(canvas.width/scale.x, canvas.height/scale.y);

/*

	TODO:
	- Score
	- Starting Mechanics
	  - Get starting items
	    - watering can 1
		- 4 plots of soil
		- 4 barley seeds
	  - Tutorial?
	- Graphics (low priority)
	- Sfx (probably random generated sfx)
	- Music (piss off, i cant make music, lowest priority)

*/

/*
	
	Things Ive Re-used:
	- main.js (setup, canvas and game state variables)
	  - I have a template folder for initial html-js project setup
	- vector2.js (didnt feel like re-coding it)
	  - I have a custom library folder with alot of different things
	- PlayerGUI.js (made it so i had a "universal" GUI class)
	  - I hate the code but i didnt really have any other ideas
	
*/

// called when the window is done loading everything
function setup(){
	
	// edge around screen
	colliders.push(new Collider(0, 0, 640, 96));
	colliders.push(new Collider(0, 544, 640, 96));
	colliders.push(new Collider(0, 96, 96, 448));
	colliders.push(new Collider(544, 96, 96, 448));
	
	// initial values for stuff
	keys["shift"] = false;
	closeMarket();
	
	// temporary items for testing
	items.push(Item.getItemByID(9).cloneAt(new Vector2(104, 136)));
	items.push(Item.getItemByID(11).cloneAt(new Vector2(184, 152)));
	items.push(Item.getItemByID(12).cloneAt(new Vector2(136, 136)));
	items.push(Item.getItemByID(13).cloneAt(new Vector2(168, 136)));
	items.push(Item.getItemByID(14).cloneAt(new Vector2(200, 136)));
	items.push(Item.getItemByID(15).cloneAt(new Vector2(104, 168)));
	items[0].stackCount = 10;
	items[1].stackCount = 10;

	items = insertionSort(items);
	
	// makes images look bad when true
	ctx.imageSmoothingEnabled = false;
	
	start();
}

// main loop
function start(){
	
	// calculating delta time
	let currentTime = new Date().getTime();
	let diff = currentTime - lastFrame;
	
	if(diff >= FPS_INVERSE){
		// update delta time
		deltaTime = diff;
		
		// call main update function
		update();
		
		// update time of last frame
		lastFrame = new Date().getTime();
	}
	// update elaphsed time
	elapsedTime = new Date().getTime() - startTime;
	
	// recursive call
	requestAnimationFrame(start);
}

// main game update loop
function update(){
	// user input
	if(keys["escape"]) closeMarket();
	if(!marketEnabled()){
		if(keys["w"]) player.move(new Vector2(0, -moveSpeed));
		if(keys["s"]) player.move(new Vector2(0,  moveSpeed));
		if(keys["a"]) player.move(new Vector2(-moveSpeed, 0));
		if(keys["d"]) player.move(new Vector2( moveSpeed, 0));

		// i dont know what the hell this is
		// but it caused me so many problems
		// and i spent probably over an hour
		// dealing with bugs related to this
		if(keys[" "] && !itemAction){
			// interact with the market
			player.interactMarket(market);
			if(!marketEnabled()){
				if(items.length > 0){
					items = insertionSort(items);
					let result = player.interactItem(items[0], waterwell, composter, soil);
					if(result.del) {
						items[0].stackCount--;
						if(items[0].stackCount <= 0) items.splice(0, 1);
					}
					if(result.drop != undefined) items.push(result.drop);
				}
				else {
					// result from interaction
					let result = player.interactItem(player.item, waterwell, composter, soil);
					if(result.drop != undefined) items.push(result.drop);
				}
			}
			itemAction = true;
		}
	}
	
	// save original canvas and then scale
	ctx.save();
	ctx.scale(scale.x, scale.y);
	
	// camera translation
	let offX = -1 * player.pos.x + camSize.x/2 - player.size.x/2;
	let offY = -1 * player.pos.y + camSize.y/2 - player.size.y/2;
	offX = offX > 0 ? 0 : offX < camSize.x - canvas.width  ? camSize.x - canvas.width  : offX;
	offY = offY > 0 ? 0 : offY < camSize.y - canvas.height ? camSize.y - canvas.height : offY;
	ctx.translate(offX, offY);
	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(map_default, 0, 0);

	// game physics, updates and rendering

	// collision with bounds
	for(let i = 0; i < colliders.length; i++) player.collide(colliders[i]);

	// draw soil plots
	for(let i = 0; i < soil.length; i++) soil[i].draw(ctx);

	// draw items
	for(let i = 0; i < items.length; i++) items[i].draw(ctx);
	
	// draw structures
	waterwell.draw(ctx, util_waterwell);
	composter.draw(ctx, util_composter[Math.floor(composter.progress*5)]);
	market.draw(ctx, util_market);

	// draw soil outline
	if(player.item.id == 11){
		ctx.lineWidth = 1;
		ctx.fillStyle = "rgb(0,255,0,0.1)";
		let pos = player.pos.clone();

		if(keys["capslock"]){
			let mid = player.getMidPoint();
			pos.x = mid.x - mid.x % 32;
			pos.y = mid.y - mid.y % 32;
		}
		ctx.fillRect(pos.x, pos.y, 32, 32);
	}

		// draw player
		player.draw(ctx);

	// draw and update particles
	for(let i = 0; i < particles.length; i++){
		if(particles[i].particles.length == 0){
			particles.splice(i, 1);
			i--;
		}
		if(i >= 0){
			particles[i].update();
			particles[i].draw(ctx);
		}
	}
	
	// restore canvas to default
	ctx.restore();
	
	// update and draw GUI
	GUI_Player[3].value = player.score;
	GUI_Player[4].value = player.coins;

	GUI_Player[5].url = Item.getItemImage(player.item.id).src;
	GUI_Player[5].reloadImage();
	GUI_Player[5].enabled = player.item.id != 0;

	if(marketEnabled()) GUI_Player[5].enabled = false;
	for(let i = 0; i < GUI_Market.length; i++) GUI_Market[i].draw();
	if(!marketEnabled()) for(let i = 0; i < GUI_Player.length; i++) GUI_Player[i].draw();
}

// check if any of the market GUIs are enabled
function marketEnabled(){

	for(let i = 0; i < GUI_Market.length; i++) if(GUI_Market[i].enabled) return true;
	return false;
}

// disable all market GUIs
function closeMarket(){
	for(let i = 0; i < GUI_Market.length; i++) GUI_Market[i].enabled = false;
}

// standard aabb rectangle overlap detection
function aabbOverlap(ap, ab, bp, bb){
	return ap.x + ab.x > bp.x && ap.x < bp.x + bb.x && ap.y + ab.y > bp.y && ap.y < bp.y + bb.y;
}

// insertion sorting algorithm adapted for item object
function insertionSort(input){
	let arr = clone(input);
	if(arr.length <= 1) return arr;
	
	for(let i = 1; i < arr.length; i++){
		let j = i;
		let temp = arr[i].clone();
		let dist = Vector2.distance(player.pos, temp.pos);
		while(j > 0 && Vector2.distance(player.pos, arr[j-1].pos) > dist){
			arr[j] = arr[j-1];
			j--;
		}
		arr[j] = temp;
	}
	return arr;
}

function clone(input){
	let arr = new Array(input.length);
	for(let i = 0; i < arr.length; i++) arr[i] = input[i];
	return arr;
}

// triggered when key is pressed down
function onKeyDownEvent(e){
	if(e.key.toLowerCase() == "capslock") { keys["capslock"] = !keys["capslock"]; return; }
	// set key pressed at key index to true
	keys[e.key.toLowerCase()] = true;
}

// triggered when key is released
function onKeyUpEvent(e){
	if(e.key.toLowerCase() == "capslock") return;
	// set key pressed at key index to false
	keys[e.key.toLowerCase()] = false;
	if(e.key == " ") itemAction = false;
}