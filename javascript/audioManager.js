let place = new Audio("audio/place.wav");
let plant = new Audio("audio/plant.wav");
let water = new Audio("audio/water.wav");

function playSound(type){
    switch(type){
        case "place":
            place.currentTime = 0;
            place.play();
        break;
        case "plant":
            plant.currentTime = 0;
            plant.play();

        break;
        case "water":
            water.currentTime = 0;
            water.play();
        break;
    }
}