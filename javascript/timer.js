window.addEventListener("load", _timersInternalClock);

let _timers = [];

function _timersInternalClock(){
	
	for(let i = 0; i < _timers.length; i++){
		if(_timers[i].active && _timers[i].onElapsed != undefined && new Date().getTime() - _timers[i].lastElapse >= _timers[i].interval){
			_timers[i].onElapsed(_timers[i]);
			_timers[i].lastElapse = new Date().getTime();
		}
	}
	
	requestAnimationFrame(_timersInternalClock);
}

class Timer{
	constructor(){
		this.startTime = new Date().getTime();
		this.stopTime = new Date().getTime();
		this.lastElapse = new Date().getTime();
		this.onElapsed = undefined;
		this.active = false;
		this.interval = 1000;
		this.interactables = [];
		
		_timers.push(this);
	}
	
	start(){
		this.startTime = new Date().getTime();
		this.active = true;
	}
	
	stop(){
		if(this.active) this.stopTime = new Date().getTime();
		this.active = false;
	}
	
	addInteractable(obj){
		this.interactables.push(obj);
	}
	
	getInteractable(id){
		return this.interactables[id];
	}
	
	setInterval(n){
		this.interval = n;
		this.lastElapse = new Date().getTime();
	}
	
	getElapsedTime(){
		return this.active ? new Date().getTime() - this.startTime : this.stopTime - this.startTime;
	}
}