class Vector2{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.calculatePolar();
	}
	
	calculatePolar(){
		this.length = Math.sqrt((this.x*this.x)+(this.y*this.y));
		this.theta = Math.atan2(this.y, this.x);
		return this;
	}
	
	calculateCartesian(){
		this.x = this.length * Math.cos(this.theta);
		this.y = this.length * Math.sin(this.theta);
		return this;
	}
	
	setCartesian(x, y){
		this.x = x;
		this.y = y;
		this.calculatePolar();
		return this;
	}
	
	setPolar(length, theta){
		this.length = length;
		this.theta = theta;
		this.calculateCartesian();
		return this;
	}
	
	rotate(theta){
		this.theta += theta;
		this.calculateCartesian();
		return this;
	}
	
	extend(length){
		this.length += length;
		this.calculateCartesian();
		return this;
	}
	
	clone(){
		return new Vector2(this.x, this.y);
	}
	
	distance(to){
		return Math.sqrt((to.x-this.x)*(to.x-this.x)+(to.y-this.y)*(to.y-this.y));
	}
	
	multiply(scale){
		this.length *= scale;
		this.calculateCartesian();
		return this;
	}
	
	divide(scale){
		this.length /= scale;
		this.calculateCartesian();
		return this;
	}
	
	add(v){
		this.x += v.x;
		this.y += v.y;
		this.calculatePolar();
		return this;
	}
	
	subtract(v){
		this.x -= v.x;
		this.y -= v.y;
		this.calculatePolar();
		return this;
	}
	
	normalise(){
		this.length = 1;
		this.calculateCartesian();
		return this;
	}
	normalised(){
		return Vector2.fromPolar(1, this.theta);
	}
	
	equals(v) {
		return this.x == v.x && this.y == v.y;
	}
	
	//statics
	
	static normalised(v) { return Vector2.fromPolar(1, v.theta); }
	static fromPolar(length, theta) { return new Vector2(length * Math.cos(theta), length * Math.sin(theta)); }
	static add(v1, v2) { return new Vector2(v1.x + v2.x, v1.y + v2.y); }
	static subtract(v1, v2) { return new Vector2(v1.x-v2.x, v1.y-v2.y); }
	static multiply(v, scale) { return new Vector2(v.x * scale, v.y * scale); }
	static divide(v, scale) { return new Vector2(v.x / scale, v.y / scale); }
	static dot(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
	static distance(v1, v2) { return Math.sqrt((v1.x-v2.x)*(v1.x-v2.x)+(v1.y-v2.y)*(v1.y-v2.y)); }
	static angleToRadian(a) { return a * Math.PI / 180; }
	static radianToAngle(a) { return a * 180 / Math.PI; }
	static midPoint(v1) { return new Vector2(v1.x/2, v1.y/2); }
}