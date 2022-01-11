class Item{
	constructor(id, name, stackCount, compostVal, uses, value, cost){
		this.id = id;
		this.name = name;
		this.stackCount = stackCount;
		this.compostVal = compostVal;
		this.pos = new Vector2(0, 0);
		this.size = new Vector2(16, 16);
		this.uses = uses;
		this.value = value;
		this.cost = cost;
	}
	
	// used for debugging
	debug(c){
		c.lineWidth = 1;
		c.strokeStyle = this.getItemColor();
		c.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		c.beginPath();
		c.arc(this.getMidPoint().x, this.getMidPoint().y, 16, 0, 2 * Math.PI);
		c.stroke();
	}

	// draw item to screen
	draw(c){
		c.drawImage(Item.getItemImage(this.id), this.pos.x, this.pos.y);
	}
	
	// return a duplicate item
	clone(){
		let item = new Item(this.id, this.name, this.stackCount, this.compostVal, this.uses, this.value, this.cost);
		item.pos = this.pos.clone();
		item.size = this.size.clone();
		return item;
	}
	
	// return a duplicate item at a specific position
	cloneAt(pos){
		let item = new Item(this.id, this.name, this.stackCount, this.compostVal, this.uses, this.value, this.cost);
		item.pos = pos;
		return item;
	}
	
	// get mid point of rect
	getMidPoint(){
		return new Vector2(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
	}
	
	// get render image
	static getItemImage(id){
		switch(id){
			case  0: return tile_null;
			case  1: return tile_0_0;
			case  2: return tile_0_3;
			case  3: return tile_1_0;
			case  4: return tile_1_3;
			case  5: return tile_2_0;
			case  6: return tile_2_3;
			case  7: return tile_3_0;
			case  8: return tile_3_3;
			case  9: return tile_4_0;
			case 10: return tile_4_3;
			case 11: return tile_5_0;
			case 12: return tile_5_1;
			case 13: return tile_5_2;
			case 14: return tile_5_3;
			case 15: return tile_0_4;
		}
		return tile_null;
	}

	// get item color
	// I dont think this is used anymore
	getItemColor(){
		switch(this.id){
			case  0: return "rgb(255,255,255)";
			case  1: return "rgb(255,255,0)";
			case  2: return "rgb(215,195,0)";
			case  3: return "rgb(255,128,0)";
			case  4: return "rgb(235,108,0)";
			case  5: return "rgb(235,235,0)";
			case  6: return "rgb(195,195,0)";
			case  7: return "rgb(255,0,0)";
			case  8: return "rgb(215,0,0)";
			case  9: return "rgb(200,200,200)";
			case 10: return "rgb(160,160,160)";
			case 11: return "rgb(210,105,30)";
			case 12: return "rgb(0,0,255)";
			case 13: return "rgb(0,0,205)";
			case 14: return "rgb(0,0,155)";
			case 15: return "rgb(64,64,64)";
		}
		return "rgb(255,0,255)";
	}

	// get item from ID
	static getItemByID(id){
		switch(id){
			case  0: return new Item( 0, "SDV_EMPTY",        1, -1,   -1,  0, -1);
			case  1: return new Item( 1, "SDV_SEED_POTATO",  1, 0.10, -1,  2,  5);
			case  2: return new Item( 2, "SDV_PROD_POTATO",  1, 0.20, -1,  3, -1);
			case  3: return new Item( 3, "SDV_SEED_CARROT",  1, 0.05, -1,  1,  3);
			case  4: return new Item( 4, "SDV_PROD_CARROT",  1, 0.15, -1,  2, -1);
			case  5: return new Item( 5, "SDV_SEED_BARLEY",  1, 0.05, -1,  1,  2);
			case  6: return new Item( 6, "SDV_PROD_BARLEY",  1, 0.10, -1,  2, -1);
			case  7: return new Item( 7, "SDV_SEED_TOMATO",  1, 0.05, -1,  1,  3);
			case  8: return new Item( 8, "SDV_PROD_TOMATO",  1, 0.15, -1,  2, -1);
			case  9: return new Item( 9, "SDV_SEED_ROCK",    1, 0.10, -1,  2,  5);
			case 10: return new Item(10, "SDV_PROD_ROCK",    1, 0.30, -1,  4, -1);
			case 11: return new Item(11, "SDV_SOIL",         1, -1,   -1,  5, 10);
			case 12: return new Item(12, "SDV_TOOL_WATER_1", 1, -1,    3,  5, 15);
			case 13: return new Item(13, "SDV_TOOL_WATER_2", 1, -1,    4, 10, 25);
			case 14: return new Item(14, "SDV_TOOL_WATER_3", 1, -1,    5, 20, 50);
			case 15: return new Item(15, "SDV_TOOL_TROWEL",  1, -1,   -1, 10, 25);
		}
		return new Item(-1, "SDV_NULL", 1, -1, -1);
	}
}