// tilemap

let tile_0_0 = loadImage("img/item/tilemap/tile_0_0.png");
let tile_0_1 = loadImage("img/item/tilemap/tile_0_1.png");
let tile_0_2 = loadImage("img/item/tilemap/tile_0_2.png");
let tile_0_3 = loadImage("img/item/tilemap/tile_0_3.png");
let tile_0_4 = loadImage("img/item/tilemap/tile_0_4.png");

let tile_1_0 = loadImage("img/item/tilemap/tile_1_0.png");
let tile_1_1 = loadImage("img/item/tilemap/tile_1_1.png");
let tile_1_2 = loadImage("img/item/tilemap/tile_1_2.png");
let tile_1_3 = loadImage("img/item/tilemap/tile_1_3.png");

let tile_2_0 = loadImage("img/item/tilemap/tile_2_0.png");
let tile_2_1 = loadImage("img/item/tilemap/tile_2_1.png");
let tile_2_2 = loadImage("img/item/tilemap/tile_2_2.png");
let tile_2_3 = loadImage("img/item/tilemap/tile_2_3.png");

let tile_3_0 = loadImage("img/item/tilemap/tile_3_0.png");
let tile_3_1 = loadImage("img/item/tilemap/tile_3_1.png");
let tile_3_2 = loadImage("img/item/tilemap/tile_3_2.png");
let tile_3_3 = loadImage("img/item/tilemap/tile_3_3.png");

let tile_4_0 = loadImage("img/item/tilemap/tile_4_0.png");
let tile_4_1 = loadImage("img/item/tilemap/tile_4_1.png");
let tile_4_2 = loadImage("img/item/tilemap/tile_4_2.png");
let tile_4_3 = loadImage("img/item/tilemap/tile_4_3.png");

let tile_5_0 = loadImage("img/item/tilemap/tile_5_0.png");
let tile_5_1 = loadImage("img/item/tilemap/tile_5_1.png");
let tile_5_2 = loadImage("img/item/tilemap/tile_5_2.png");
let tile_5_3 = loadImage("img/item/tilemap/tile_5_3.png");

let tile_null = loadImage("img/item/tilemap/tile_null.png");

// util

let util_waterwell = loadImage("img/util/util_waterwell.png");
let util_composter = [ 	loadImage("img/util/util_composter_state0.png"), loadImage("img/util/util_composter_state1.png"), loadImage("img/util/util_composter_state2.png"), loadImage("img/util/util_composter_state3.png"), loadImage("img/util/util_composter_state4.png") ];
let util_market = loadImage("img/util/util_market.png");
let util_soil = [ loadImage("img/util/util_soil_dry.png"), loadImage("img/util/util_soil_wet.png") ];

// map

let map_default = loadImage("img/map/map_default.png");

// load image from directory
function loadImage(src){
	let image = new Image();
	image.src = src;
	return image;
}