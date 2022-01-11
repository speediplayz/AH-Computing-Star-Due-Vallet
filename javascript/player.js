class Player{
	constructor(pos, size){
		this.pos = pos;
		this.size = size;
		this.item = Item.getItemByID(0);
		this.score = 0;
		this.coins = 0;
	}

	collide(coll){
		// updated player bounds for dynamic feel
		let this_pos = new Vector2(this.pos.x + 8, this.pos.y + 14);
		let this_size = new Vector2(16, 16);
		// deltas in every direction
		let dt = {m:this_pos.y + this_size.y - coll.pos.y,d:new Vector2( 0, -1)};
		let db = {m:coll.pos.y + coll.size.y - this_pos.y,d:new Vector2( 0,  1)};
		let dl = {m:this_pos.x + this_size.x - coll.pos.x,d:new Vector2(-1,  0)};
		let dr = {m:coll.pos.x + coll.size.x - this_pos.x,d:new Vector2( 1,  0)};
		
		// smallest delta
		let min = dt.m < db.m && dt.m < dl.m && dt.m < dr.m ? dt : db.m < dl.m && db.m < dr.m ? db : dl.m < dr.m ? dl : dr;
		// if delta is > 0, offset player in correct direction
		if(min.m > 0)this.pos.add(Vector2.multiply(min.d, min.m + 1));
	}
	
	interactMarket(market){
		// distance to market
		let marketDist = Vector2.distance(this.getMidPoint(), market.getMidPoint());
		if(marketDist < market.range){
			// enable market if its within radius
			GUI_Market[0].enabled = true;
			return {act:true,del:false,drop:undefined};
		}
		return {act:false,del:false,drop:undefined};
	}

	interactItem(item, waterwell, composter, soil){
		
		// drop item if shift is pressed
		if(keys["shift"] && this.item.id != 0){
			let dropped = this.item.clone();
			dropped.pos = Vector2.add(this.pos, new Vector2(8, 8));
			this.item = Item.getItemByID(0);
			// drop players current item
			return {act:true,del:false,drop:dropped};
		}
		
		let itemDist = Vector2.distance(this.getMidPoint(), item.getMidPoint());
		if(itemDist < 16 && this.item.id == 0) { // 16 is good range for an item
			
			// pick up item from ground and then delete
			this.item = item.clone();
			this.item.stackCount = 1;
			
			return {act:true,del:true,drop:undefined};
		} else if(this.item.id != 0) {
			// do actions for custom items firstChild
			
			let id = this.item.id;
			
			// water well
			let wellDist = Vector2.distance(this.getMidPoint(), waterwell.getMidPoint());
			if(wellDist < waterwell.range){
				// player item is a watering can
				if(id >= 12 && id <= 14){
					player.item.uses = id == 12 ? 3 : id == 13 ? 4 : id == 14 ? 5 : 0;
					return {act:true,del:false,drop:undefined};
				}
			}
			
			// watering can
			if(id >= 12 && id <= 14 && this.item.uses > 0){
				// can range based on level
				let canRange = 	id == 12 ? 16 :
								id == 13 ? 24 :
								id == 14 ? 32 : 0;
				
				for(let i = 0; i < soil.length; i++){
					let soilDist = Vector2.distance(soil[i].getMidPoint(), this.getMidPoint());
					if(soilDist < canRange){
						// water plot if its within range
						if(soil[i].plantedID != -1 && !soil[i].watered) soil[i].timer.start();
						soil[i].watered = true;
					}
				}
				// reduce uses and spawn particle
				this.item.uses--;
				let particle = new Particle(this.getMidPoint(), canRange, new Vector2(1, canRange/4), 0.75, 2, "rgb(0,0,255,0.25)", 625);
				particles.push(particle);
				// return result
				return {act:true,del:false,drop:undefined};
			}
			
			// trowel
			if(id == 15){
				let result = this.#getClosestSoil();
				
				let closestIndex = result.index;
				let closestDist = result.dist;
				
				if(closestIndex >= 0 && closestDist < soil[closestIndex].range && soil[closestIndex].plantedID == -1){
					// if closest soil is within range, pick up soil
					soil.splice(closestIndex, 1);
					let dropped = this.item.clone();
					dropped.pos = Vector2.add(this.pos, new Vector2(8, 8));
					this.item = Item.getItemByID(0);
					// give player soil
					this.item = Item.getItemByID(11);
					// drop players current item
					return {act:true,del:false,drop:dropped};
				}
			}
			
			// soil
			if(id == 11){
				let plotPos = this.pos.clone();
				// lock to grid
				if(keys["capslock"]){
					let mid = this.getMidPoint();
					plotPos.x = mid.x - mid.x % 32;
					plotPos.y = mid.y - mid.y % 32;
				}
				let overlaps = false;
				// check for overlap with other soil plots
				for(let i = 0; i < soil.length; i++){
					// aabb rect collision detection
					let overlap = aabbOverlap(soil[i].pos, soil[i].size, plotPos, new Vector2(32, 32));
					overlaps = overlap ? true : overlaps;
				}
				
				if(!overlaps){
					// remove item from player
					this.item = Item.getItemByID(0);
					// create instance of a soil object
					let plot = new Soil(plotPos, new Vector2(32, 32), 24);
					// add plot to soil list
					soil.push(plot);
					// return result
					return {act:true,del:false,drop:undefined};
				}
			}
			
			// plant seeds
			if(id == 1 || id == 3 || id == 5 || id == 7 || id == 9){
				// get closest soil
				let result = this.#getClosestSoil();
				
				let closestIndex = result.index;
				let closestDist = result.dist;
				
				// if closest is valid, plant a seed
				if(closestIndex >= 0 && closestDist < soil[closestIndex].range && soil[closestIndex].plantedID == -1){
					soil[closestIndex].plantCrop(this.item.id);
					// remove seed from player
					this.item = Item.getItemByID(0);
					// return result
					return {act:true,del:false,drop:undefined};
				}
			}
			
			// composter
			let compDist = Vector2.distance(this.getMidPoint(), composter.getMidPoint());
			if(this.item.compostVal > 0 && compDist < composter.range){
				// increment composter fill value
				composter.progress += this.item.compostVal;
				let particle = new Particle(composter.getMidPoint(), 100, new Vector2(2.5, 12.5), 0.75, 2, "rgb(255,255,255,0.25)", 625);
				particles.push(particle);
				// remove item being composted
				this.item = Item.getItemByID(0);
				if(composter.progress.toFixed(2) >= 1) {
					// empty composter if its filled
					composter.progress = 0
					// give the player soil
					this.item = Item.getItemByID(11);
				}
				// return result
				return {act:true,del:false,drop:undefined};
			}
		} else {
			// pick up crop from soil
			let result = this.#getClosestSoil();
			// check plot is valid
			if(result.index > -1 && result.dist < soil[result.index].range){
				let plot = soil[result.index];
				let id = plot.plantedID;
				// make sure plot is grown
				if(plot.grown){
					// give player produce
					this.item = Item.getItemByID(id);
					plot.plantedID = -1;
					plot.grown = false;
					plot.watered = false;
					// drop a seed
					let seed = Item.getItemByID(id-1);
					// chance of having double seeds
					seed.stackCount = Math.random() < 0.33 ? 2 : 1;
					seed.pos = Vector2.add(plot.pos, new Vector2(8, 8));
					// return result
					return {act:true,del:false,drop:seed};
				}
			}
		}
		// default return
		return {act:false,del:false,drop:undefined};
	}
	
	// get mid point of rect
	getMidPoint(){
		return new Vector2(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
	}
	
	// move player by delta
	move(delta){
		this.pos.add(delta);
	}
	
	// draw player to screen
	draw(c){
		c.lineWidth = 1;
		c.strokeStyle = "black";
		c.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		c.strokeRect(this.getMidPoint().x-2, this.getMidPoint().y-2, 4, 4);
		c.strokeRect(this.pos.x+8, this.pos.y + 14, 16, 16);
	}
	
	// private function to find closest existing soil
	#getClosestSoil(){
		if(soil.length == 0) return {index:-1, dist:65535};
		let closestIndex = -1;
		let closestDist = 65535;
		for(let i = 0; i < soil.length; i++){
			// distance to current
			let soilDist = Vector2.distance(soil[i].getMidPoint(), this.getMidPoint())
			if(soilDist < closestDist){
				// update closest
				closestIndex = i;
				closestDist = soilDist;
			}
		}
		return {index:closestIndex,dist:closestDist};
	}
}