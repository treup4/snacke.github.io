const control = document.createElement('div');
control.textContent = 'R - restart, Space - ability';
control.style.position = 'absolute';
control.style.top='60px';
control.style.right = '150px';
control.style.fontSize = '20px';
control.style.color='white';
document.body.appendChild(control);
let lastRenderTime=0;
const SNACKE_SPEED=6;
let canTwist=true;
let gamIsOver=false;
let score=0;
const colors = ['red-back','orange-back','yellow-back','lightgreen-back','blue-back','purple-back']
let abilityActive=0;
const scoreConteiner = document.getElementById('score-conteiner')
let duraction = {x:0,y:0}
let food = {x:Math.floor(Math.random()*21)+1,y:Math.floor(Math.random()*21)+1}
const gameBoard = document.getElementById('game-board')
const gameOver = document.getElementById('game-over')
const SnakeBody = [
	{x:11,y:11}
	//{x:12,y:11},
	//{x:13,y:11}
				]
const gameBoardis = [
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],



]


document.addEventListener('keypress',(Key)=>{
	
const keyName = Key.code;
if(canTwist){
switch (keyName) {
	case 'KeyW':
		duraction.x=0;
		duraction.y!=1?duraction.y=-1:duraction.y=1;
		break;
	case 'KeyA':
		duraction.x!=1?duraction.x=-1:duraction.x=1;
		duraction.y=0;
		break;
	case 'KeyD':
		duraction.x!=-1?duraction.x=1:duraction.x=-1;
		duraction.y=0;
		break;
	case 'KeyS':
		duraction.x=0;
		duraction.y!=-1?duraction.y=1:duraction.y=-1;
		break;
	case 'Space': 
		ability();
		break;
}
canTwist=false;
}
if(keyName=='KeyR') location.reload();
})


function main(curTime) {
	window.requestAnimationFrame(main);
	const secondsSinceLastRender = (curTime - lastRenderTime)/1000;
	if(secondsSinceLastRender<1/SNACKE_SPEED) return
	lastRenderTime=curTime;
if(!gamIsOver){
	if(duraction.x!=duraction.y)
	update();
	draw();
	canTwist=true;
}
}


window.requestAnimationFrame(main);

function ability(){
	const bodylength = SnakeBody.length;
	if(bodylength>3){
		gameBoardis[SnakeBody[bodylength-1].y-1][SnakeBody[bodylength-1].x-1]=false;
		gameBoardis[SnakeBody[bodylength-2].y-1][SnakeBody[bodylength-2].x-1]=false;
		gameBoardis[SnakeBody[bodylength-3].y-1][SnakeBody[bodylength-3].x-1]=false;
		SnakeBody.pop();
		SnakeBody.pop();
		SnakeBody.pop();
		score-=300;
		abilityActive=9;
	}
}

function isSnake(x,y){
	return gameBoardis[y-1][x-1];
}


function moveWithAbility(){
	

		gameBoardis[SnakeBody[SnakeBody.length-1].y-1][SnakeBody[SnakeBody.length-1].x-1]=false;
	for (var i = SnakeBody.length - 2; i >= 0; i--) {
		SnakeBody[i+1] = {...SnakeBody[i]}
		gameBoardis[SnakeBody[i+1].y-1][SnakeBody[i+1].x-1]=true;
	}
		if(((SnakeBody[0].x+duraction.x)>21||(SnakeBody[0].x+duraction.x)<=0)||((SnakeBody[0].y+duraction.y)>21||(SnakeBody[0].y+duraction.y)<=0)) {
		if(duraction.x==1){
			SnakeBody[0].x=1;
		} else if(duraction.x==-1){
			SnakeBody[0].x=21;
		} 
		if(duraction.y==1){
			SnakeBody[0].y=1;
		} else if(duraction.y==-1){
			SnakeBody[0].y=21;
		}
	} else {
		SnakeBody[0].x+=duraction.x; 
		SnakeBody[0].y+=duraction.y;
	}

		gameBoardis[SnakeBody[0].y-1][SnakeBody[0].x-1]=true;
	
		

	abilityActive--;
}


function update() {

	if((SnakeBody[0].x+duraction.x)==food.x&&(SnakeBody[0].y+duraction.y)==food.y)
	{
		SnakeBody.unshift({x:SnakeBody[0].x+duraction.x, y:SnakeBody[0].y+duraction.y});
		food = {x:Math.floor(Math.random()*21)+1,y:Math.floor(Math.random()*21)+1}
		while (isSnake(food.x,food.y)) {
			food={x:Math.floor(Math.random()*21)+1,y:Math.floor(Math.random()*21)+1};
		}
		score+=100;
	} else {
		if(abilityActive){
			moveWithAbility();
		} else {
	if(((SnakeBody[0].x+duraction.x)<=21&&(SnakeBody[0].x+duraction.x)>0)&&((SnakeBody[0].y+duraction.y)<=21&&(SnakeBody[0].y+duraction.y)>0)) {
	if(gameBoardis[SnakeBody[0].y+duraction.y-1][SnakeBody[0].x+duraction.x-1]==true){
		gameOver.classList.add("game-over");
		gamIsOver=true;
	}

		gameBoardis[SnakeBody[SnakeBody.length-1].y-1][SnakeBody[SnakeBody.length-1].x-1]=false;
	for (var i = SnakeBody.length - 2; i >= 0; i--) {
		SnakeBody[i+1] = {...SnakeBody[i]}
		gameBoardis[SnakeBody[i+1].y-1][SnakeBody[i+1].x-1]=true;
	}
		SnakeBody[0].x+=duraction.x; 
		SnakeBody[0].y+=duraction.y;
		gameBoardis[SnakeBody[0].y-1][SnakeBody[0].x-1]=true;
	} else {
		gameOver.classList.add("game-over");
		gamIsOver=true;
	}
	}
}

}

function draw() {
	scoreConteiner.innerHTML = '';
	const scoreBord = document.createElement('div');
	scoreBord.classList.add('score');
	scoreBord.textContent = 'score: '+score.toString();
	scoreConteiner.appendChild(scoreBord);
	//console.log(scoreBord.innerHTML);
	gameBoard.innerHTML = '';
	const Food = document.createElement('div');
	Food.style.gridRowStart = food.y;
	Food.style.gridColumnStart = food.x;
	Food.classList.add('food');
	gameBoard.appendChild(Food);	

	let colorCounter=0;
	SnakeBody.forEach( (segment) => {
	const SnakeElement = document.createElement('div');
	SnakeElement.style.gridRowStart = segment.y;
	SnakeElement.style.gridColumnStart=segment.x;
	SnakeElement.classList.add('snake');
	if(abilityActive){
	SnakeElement.classList.add(colors[colorCounter%7])
	colorCounter++;
	}
	gameBoard.appendChild(SnakeElement);
	});


}



