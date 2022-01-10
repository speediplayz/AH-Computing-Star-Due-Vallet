class Soil{
	constructor(pos, size, range){
		this.pos = pos;
		this.size = size;
		this.range = range;
		this.plantedID = -1;
		this.grown = false;
		this.growStage = 0; // 0, 1, 2 - mature
		this.watered = false;
		this.timer = new Timer();
		this.timer.onElapsed = this.#updateCrop;
		this.timer.addInteractable(this);
	}
	
	// update state of soil when planted
	plantCrop(id){
		this.plantedID = id;
		this.grown = false;
		this.timer.start();
		this.timer.setInterval(this.#getGrowTime());
	}
	
	// private update function
	#updateCrop(timer){
		// get plot from local timer interactables
		let plot = timer.getInteractable(0);
		if(plot.watered){
			// increase grow stage
			plot.growStage++;
			if(plot.growStage == 3){
				// reset growth stage
				plot.growStage = 0;
				// set crop to grown state
				plot.plantedID++;
				plot.grown = true;
				// stop timer from unnecessary ticking
				timer.stop();
			}
		}
	}
	
	// get mid point of rect
	getMidPoint(){
		return new Vector2(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
	}

	// draw soil to screen
	draw(c){
		c.drawImage(util_soil[this.watered?1:0], this.pos.x, this.pos.y);
		if(this.plantedID == -1) return;
		let mid = this.getMidPoint();
		c.drawImage(this.#getCropImage(), mid.x-8, mid.y-8);
	}
	
	// used for debugging
	debug(c){
		c.drawImage(util_soil[this.watered?1:0], this.pos.x, this.pos.y);
		let mid = this.getMidPoint();
		// c.strokeStyle = "rgb(230,105,30)";
		// c.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		// c.beginPath();
		// c.arc(mid.x, mid.y, 24, 0, 2 * Math.PI);
		// c.stroke();
		if(this.plantedID >= 0){
			c.lineWidth = 1;
			c.strokeStyle = Item.getItemByID(this.plantedID).getItemColor();
			c.strokeRect(mid.x-8, mid.y-8, 16, 16);
		}
	}
	
	// private function to get crop state
	#getCropImage(){
		switch(this.plantedID){
			case  1: return tile_0_2;
			case  2: return tile_0_1;
			case  3: return tile_1_2;
			case  4: return tile_1_1;
			case  5: return tile_2_2;
			case  6: return tile_2_1;
			case  7: return tile_3_2;
			case  8: return tile_3_1;
			case  9: return tile_4_2;
			case 10: return tile_4_1;
		}
		return tile_null;
	}

	// private function to get growth time
	#getGrowTime(){
		switch(this.plantedID){
			case 1: return 20000;
			case 3: return 15000;
			case 5: return 10000;
			case 7: return 15000;
			case 9: return 25000;
		}
		return 1000;
	}
}