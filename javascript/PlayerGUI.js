// document.onmousedown = mouseDownEvent;
// document.onmouseup   =   mouseUpEvent;
// document.onmousemove = mouseMoveEvent;

document.addEventListener("mousedown", mouseDownEvent);
document.addEventListener("mouseup"  ,   mouseUpEvent);
document.addEventListener("mousemove", mouseMoveEvent);
document.addEventListener("keydown"  ,  keyDownEvent);

// buttons
let buttons = [];
let hovered = [];
let pressed = [];

// sliders
let sliders = [];
let currentSlider;

// textboxes
let forbiddenKeys = ["Tab", "CapsLock", "Shift", "Control", "Alt"];
let textboxes = [];
let currentBox;

// displays
let displays = [];

class Rect{
	
	constructor(ctx, pos, size, color, border, borderWidth, borderColor){
		this.c = ctx;
		this.pos = pos;
		this.size = size;
		this.color = color;
		this.border = border;
		this.borderWidth = borderWidth;
		this.borderColor = borderColor;
	}
	
	checkHover(x, y){
		return x > this.pos.x && x < this.pos.x + this.size.x && y > this.pos.y && y < this.pos.y + this.size.y;
	}
	
	draw(){
		this.c.fillStyle = this.color;
		this.c.strokeStyle = this.borderColor;
		this.c.lineWidth = this.borderWidth;
		this.c.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		if(this.border) this.c.strokeRect(this.pos.x + this.borderWidth/2, this.pos.y + this.borderWidth/2, this.size.x - this.borderWidth, this.size.y - this.borderWidth);
	}
}

class Text{
	
	constructor(ctx, rect, value, font){
		this.c = ctx;
		this.rect = rect;
		this.value = value;
		this.font = font == "" ? "30px ui-monospace" : font;
		this.enabled = true;
	}
	
	draw(){
		if(!this.enabled) return;
		this.c.fillStyle = this.rect.color;
		this.c.strokeStyle = this.rect.borderColor;
		this.c.lineWidth = this.rect.borderWidth;
		this.c.font = this.font;
		this.c.textBaseline = "top";
		this.c.fillText(this.value, this.rect.pos.x, this.rect.pos.y);
		if(this.rect.border) this.c.strokeText(this.value, this.rect.pos.x, this.rect.pos.y);
	}
}

class Button{
	
	constructor(c, rect, text, defaultColor, hoverColor, pressColor){
		this.c = c;
		this.rect = rect;
		this.text = text;
		this.onclick = [];
		this.state = 0;
		this.enabled = true;
		
		this.defaultColor = defaultColor;
		this.hoverColor = hoverColor;
		this.pressColor = pressColor;
		
		this.text.rect.pos.add(this.rect.pos);
		buttons.push(this);
	}
	
	draw(){
		if(!this.enabled) return;
		this.rect.color = (this.state == 1 ? this.hoverColor : this.state == 2 ? this.pressColor : this.defaultColor);
		this.rect.draw();
		this.text.draw();
	}
}

class Slider{
	
	constructor(ctx, rect, fillColor, min, max){
		this.c = ctx;
		this.rect = rect;
		this.fillColor = fillColor;
		this.enabled = true;
		
		this.min = min;
		this.max = max;
		this.val = 0.5;
		
		sliders.push(this);
	}
	
	getValue(){
		return this.min + this.val * (this.max-this.min);
	}
	
	draw(){
		if(!this.enabled) return;
		this.rect.draw();
		this.c.fillStyle = this.fillColor;
		this.c.fillRect(this.rect.pos.x, this.rect.pos.y, this.rect.size.x * this.val, this.rect.size.y);
		if(this.rect.border) this.rect.c.strokeRect(this.rect.pos.x + this.rect.borderWidth/2, this.rect.pos.y + this.rect.borderWidth/2, this.rect.size.x - this.rect.borderWidth, this.rect.size.y - this.rect.borderWidth);
	}
}

class Picture{
	
	constructor(ctx, rect, url){
		this.c = ctx;
		this.rect = rect;
		this.url = /*"file:\\\\\\" +*/ url;
		this.enabled = false;
		this.img = new Image(this.rect.size.x, this.rect.size.y);
		this.img.src = this.url;
		this.img.onload = async() => {
			this.enabled = true;
			this.draw();
		}
	}
	
	reloadImage(){
		this.img = new Image(this.rect.size.x, this.rect.size.y);
		this.img.src = this.url;
		this.img.onload = async() => {
			this.draw();
		}
	}

	draw(){
		if(!this.enabled) return;
		if(this.img.src != ""){
			this.c.drawImage(this.img, this.rect.pos.x, this.rect.pos.y, this.rect.size.x, this.rect.size.y);
		} else {
			this.rect.draw();	
		}
	}
}

class TextBox{
	
	constructor(ctx, rect, text, length){
		this.c = ctx;
		this.rect = rect;
		this.text = text;
		this.length = length;
		this.enabled = true;
		
		this.text.rect.pos.add(this.rect.pos);
		
		textboxes.push(this);
	}
	
	draw(){
		if(!this.enabled) return;
		this.rect.draw();
		this.text.draw();
	}
}

class Display{	
	constructor(ctx, rect, elements){
		this.c = ctx;
		this.rect = rect;
		this.elements = elements;
		this.enabled = true;
		
		for(let i = 0; i < this.elements.length; i++){
			if(this.elements[i].rect != null && this.elements[i].rect.pos != null) this.elements[i].rect.pos.add(this.rect.pos);
			if(this.elements[i].text != null) this.elements[i].text.rect.pos.add(this.rect.pos);
		}
		
		displays.push(this);
	}
	
	draw(){
		for(let i = 0; i < this.elements.length; i++){
			if(this.elements[i].enabled != null) this.elements[i].enabled = this.enabled;
		}
		if(!this.enabled) return;
		this.rect.draw();
		for(let i = 0; i < this.elements.length; i++){
			if(this.elements[i].draw != null) this.elements[i].draw();
		}
	}
}

// this relies on there being a canvas object variable
function getCanvasPosition(pX, pY){
	if(typeof canvas == "undefined") return new Vector2(0, 0);
	let rect = canvas.getBoundingClientRect();
	return new Vector2(pX - rect.left, pY - rect.top);
}

function mouseDownEvent(e){
	let pos = getCanvasPosition(e.pageX, e.pageY);
	// buttons
	for(let i = 0; i < hovered.length; i++){
		if(!hovered[i].enabled) continue;
		let hover = hovered[i].rect.checkHover(pos.x, pos.y);
		if(hover && !pressed.includes(hovered[i])){
			
			for(let j = 0; j < hovered[i].onclick.length; j++){
				hovered[i].onclick[j]();
			}
			
			hovered[i].state = 2;
			// hovered[i].draw();
			pressed.push(hovered[i]);
		} else if(!hover){
			let j = pressed.indexOf(hovered[i]);
			pressed.splice(j, 1);
		}
	}
	// sliders
	for(let i = 0; i < sliders.length; i++){
		if(!sliders[i].enabled) continue;
		let hover = sliders[i].rect.checkHover(pos.x, pos.y);
		if(hover){
			currentSlider = sliders[i];
			let val = (pos.x - sliders[i].rect.pos.x) / sliders[i].rect.size.x;
			sliders[i].val = val;
			sliders[i].draw();
			break;
		}
	}
	// textboxes
	for(let i = 0; i < textboxes.length; i++){
		if(textboxes[i].rect.checkHover(pos.x, pos.y)){
			currentBox = textboxes[i];
			break;
		}
	}
}

function mouseUpEvent(e){
	let pos = getCanvasPosition(e.pageX, e.pageY);
	// buttons
	for(let i = 0; i < pressed.length; i++){
		if(!pressed[i].enabled) continue;
		let hover = pressed[i].rect.checkHover(pos.x, pos.y);
		
		if(hover){
			pressed[i].state = 1;
			// pressed[i].draw();
			pressed.splice(i, 1);
		}
	}
	
	// sliders
	currentSlider = null;
}

function mouseMoveEvent(e){
	let pos = getCanvasPosition(e.pageX, e.pageY);
	// buttons
	for(let i = 0; i < buttons.length; i++){
		if(!buttons[i].enabled){
			if(hovered.includes(buttons[i])) { let j = hovered.indexOf(buttons[i]); hovered.splice(j, 1); }
			if(pressed.includes(buttons[i])) { let j = pressed.indexOf(buttons[i]); pressed.splice(j, 1); }
			buttons[i].state = 0;
			continue;
		}
		let hover = buttons[i].rect.checkHover(pos.x, pos.y);
		
		if(hover && !hovered.includes(buttons[i])){
			hovered.push(buttons[i]);
			buttons[i].state = 1;
		} else if (!hover && hovered.includes(buttons[i])){
			let j = hovered.indexOf(buttons[i]);
			hovered.splice(j, 1);
			buttons[i].state = 0;
		}
		// buttons[i].draw();
	}
	
	// sliders
	if(currentSlider != null){
		if(!currentSlider.rect.checkHover(pos.x, pos.y) || !currentSlider.enabled){
			currentSlider = null;
		} else {
			let val = (pos.x - currentSlider.rect.pos.x) / currentSlider.rect.size.x;
			currentSlider.val = val;
			currentSlider.draw();
		}
	}
}

function keyDownEvent(e){
	// textboxes
	if(currentBox != null && currentBox.enabled){
		if(forbiddenKeys.includes(e.key) ) return;
		if(e.key == "Escape" || e.key == "Enter"){
			currentBox = null;
			return;
		}
		if(e.key == "Backspace"){
			if(currentBox.text.value.length == 0) return;
			let text = currentBox.text.value;
			text = text.substring(0, text.length - 1);
			currentBox.text.value = text;
			currentBox.draw();
			return;
		}
		if(currentBox.text.value.length >= currentBox.length) return;
		currentBox.text.value += e.key;
		currentBox.draw();
	}
}