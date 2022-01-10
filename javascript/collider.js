class Collider {
	constructor(x, y, w, h){
		if(w == null){
			// vector form
			this.pos = x;
			this.size = y;
		} else {
			// scalar form
			this.pos = new Vector2(x, y);
			this.size = new Vector2(w, h);
		}
	}
	
	// used for debugging
	debug(c){
		c.strokeStyle = "red";
		c.lineWidth = 1;
		c.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}
}