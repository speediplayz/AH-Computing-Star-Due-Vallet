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
	- Currency
	  - Buy items
	  - Score Bonus
	- Market
	  - Functionality
	- Starting Mechanics
	  - Get starting items
	  - Tutorial?
	- Place display
	  - See where soil is going to be placed
	  - Some sort of outline
	- GUI
	  - Player coins
	  - Player item
	- Graphics (low priority)
	- Sfx (probably random generated sfx)
	- Music (piss off, i cant make music, lowest priority)
	
	Notes:
	- Might import PlayerGUI.js
	  - Code is an utter POS
	  - Help Menu

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
	
	// makes images look shit when true
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

function update(){
	// user input
	if(keys["escape"]) closeMarket();
	if(!marketEnabled()){
		if(keys["w"]) player.move(new Vector2(0, -moveSpeed));
		if(keys["s"]) player.move(new Vector2(0,  moveSpeed));
		if(keys["a"]) player.move(new Vector2(-moveSpeed, 0));
		if(keys["d"]) player.move(new Vector2( moveSpeed, 0));
		
		// i dont know what the fuck this is
		// but it caused me so many problems
		// and i spent probably over an hour
		// dealing with bugs related to this
		if(keys[" "] && !itemAction){
			if(items.length > 0){
				for(let i = 0; i < items.length; i++){
					let result = player.interactItem(items[i], waterwell, composter, soil);
					if(result.del){
						items[i].stackCount--;
						if(items[i].stackCount <= 0){
							items.splice(i, 1);
							i--;
						}
					}
					if(result.drop != undefined) items.push(result.drop);
					if(result.act) break;
				}
			}
			else {
				let result = player.interactItem(player.item, waterwell, composter, soil);
				if(result.drop != undefined) items.push(result.drop);
			}
			player.interactMarket(market);
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
	
	/*
		temp code
	*/
	
	for(let i = 0; i < colliders.length; i++) player.collide(colliders[i]);
	for(let i = 0; i < soil.length; i++) soil[i].draw(ctx);
	for(let i = 0; i < items.length; i++) items[i].draw(ctx);
	
	waterwell.draw(ctx, util_waterwell);
	composter.draw(ctx, util_composter[Math.floor(composter.progress*5)]);
	market.draw(ctx, util_market);
	player.draw(ctx);

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
	
	/*
		end temp code
	*/
	
	// restore canvas to default
	ctx.restore();
	
	// draw GUI
	for(let i = 0; i < GUI_Market.length; i++) GUI_Market[i].draw();
}

function marketEnabled(){

	for(let i = 0; i < GUI_Market.length; i++) if(GUI_Market[i].enabled) return true;
	return false;
}

function closeMarket(){
	for(let i = 0; i < GUI_Market.length; i++) GUI_Market[i].enabled = false;
}

function aabbOverlap(ap, ab, bp, bb){
	// aabb rectangle collision detection
	return ap.x + ab.x > bp.x && ap.x < bp.x + bb.x && ap.y + ab.y > bp.y && ap.y < bp.y + bb.y;
}

function onKeyDownEvent(e){
	if(e.key.toLowerCase() == "capslock") { keys["capslock"] = !keys["capslock"]; return; }
	// set key pressed at key index to true
	keys[e.key.toLowerCase()] = true;
}

function onKeyUpEvent(e){
	if(e.key.toLowerCase() == "capslock") return;
	// set key pressed at key index to false
	keys[e.key.toLowerCase()] = false;
	if(e.key == " ") itemAction = false;
}