class Building{
	constructor(pos, size, range){
		this.pos = pos;
		this.size = size;
		this.range = range;
		this.progress = 0; // optional
	}
	
	getMidPoint(){
		return new Vector2(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
	}
	
	draw(c, image){
		c.drawImage(image, this.pos.x, this.pos.y);
	}
	
	debug(c){
		c.strokeStyle = "lime";
		c.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		c.beginPath();
		c.arc(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2, this.range, 0, 2 * Math.PI);
		c.stroke();
	}
}