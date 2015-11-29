var level = 0;
var thread;
var gR,gL;
var groundY = 500;//Высота земли.
var x_jump = 0, jumpT = false, maxY = 0, jumpF = false;
var maxHealthPlayer = 100;
var healthP = maxHealthPlayer, damage = 10;
var speedRun = 3;//Скорость бега.

var temp = 2;//Тип движения игрока.
var imgP = new Image();
	imgP.src = 'img/player.png';

var imgWp = new Image();
	imgWp.src = 'img/weapon.png';

var imgE = new Image();
	imgE.src = 'img/enem.png'

function reAnimHp(){
	var tempx = document.getElementById("hP").getContext('2d');
	tempx.clearRect(0,0,document.getElementById("hP").width,document.getElementById("hP").height);
	tempx.fillStyle = '#00ff00';
	tempx.fillRect(0,0,60/(maxHealthPlayer/healthP),10);
}

//Объект врага
function Mob(hp, dmg){
	var healMob = hp;
	var maxhp = hp;
	var damage = dmg;
	var timerTemp = 0;
	this.func = function (){
		if(healMob <= 0){
			if(timerTemp > 1){
				if(healthP < maxHealthPlayer){
					healthP += 15;
					reAnimHp();
				}
				document.getElementById("bodyId").removeChild(newEnemy);
				clearInterval(inter);
				document.getElementById("lvlId").innerHTML = ++level;
				if(level == 10 || level == 25 || level == 40 || level == 50 || level == 55){ new Mob(Math.round(getRandomArbitary(50,300)),1); speedRun++;}
				new Mob(Math.round(getRandomArbitary(50,300)),1);
				delete this;
				return;
			}
			document.getElementById("music").play();
			timerTemp += 0.02;
				
			var x2 = timerTemp;
			x2 = Math.round(x2) % 2;
			contx_e.clearRect(0,0,image.width, image.height);
			contx_e.drawImage(imgE,x2 * imgE.width/2,imgE.height/2,imgE.width/2, imgE.height/2,0,0,imgE.width/2, imgE.height/2);

		}
		else{
			timerx += 0.05;
			var x = timerx;
			x = Math.round(x) % 2;
			contx_e.clearRect(0,0,image.width, image.height);
			contx_e.drawImage(imgE,x * imgE.width/2,0,imgE.width/2, imgE.height/2,0,0,imgE.width/2, imgE.height/2)

			newEnemy.style.left = newEnemy.offsetLeft + speed + "px";
			if(newEnemy.offsetLeft + imgE.width/2 + speed > bodyId.clientWidth) speed = -speed;
			else if(newEnemy.offsetLeft < 0) speed = -speed;
			
			if((player.offsetLeft + 140 > newEnemy.offsetLeft && player.offsetLeft + 80 < newEnemy.offsetLeft + imgE.width/2) && (player.offsetTop+60 >= newEnemy.offsetTop)){
				healthP -= 0.5;
				if(healthP < 0){ alert("Проиграл! Убито: " + level); location.reload();}
				document.getElementById("hitu").play();
				reAnimHp();
			}

			if((newEnemy.offsetLeft + imgE.width/2 > document.getElementById("wpId").offsetLeft+player.offsetLeft  && newEnemy.offsetLeft < document.getElementById("wpId").offsetLeft+player.offsetLeft + 80 ) && (player.offsetTop+32 >= newEnemy.offsetTop)){
				healMob--;
	
				document.getElementById("hit").play();
				tempContx.clearRect(0,0,100,50);
				tempContx.fillRect(0,0,Math.round(60/(maxhp/healMob)),50);
			}
		}
	}
	var hpbar = document.createElement("canvas");
	var speed = getRandomArbitary(1,3);
	var player = document.getElementById("player");
	var newEnemy = document.createElement("div");
	var image = document.createElement("canvas");
	newEnemy.setAttribute('class', 'mob');
	newEnemy.style.left = getRandomArbitary(5,bodyId.clientWidth-70);
	newEnemy.style.top = groundY - 67 + "px";
	newEnemy.style.position = "absolute";
	image.setAttribute('style','position: absolute;');
	image.width = imgE.width/2;
	image.height = imgE.height/2;
	hpbar.width = 60;
	hpbar.height = 10;
	hpbar.setAttribute('style','position: absolute;top: -25px; left: 0px; border: 2px solid black; border-radius: 10px')

	var contx_e = image.getContext('2d');
	var tempContx = hpbar.getContext('2d');
	tempContx.fillStyle = "#FF0000";
	tempContx.fillRect(0,0,100,50);
	
	document.getElementById("bodyId").appendChild(newEnemy);
	newEnemy.appendChild(image);
	newEnemy.appendChild(hpbar);

	var timerx = 0;
	var inter = setInterval(this.func,10);
}

function getRandomArbitary(min, max){
  return Math.random() * (max - min) + min;
}

function main(){
	var enemies = [new Mob(10,1), new Mob(100,1), new Mob(200,1)];//В начале уровня создаем мобов с указанным здоровьем.
	reAnimHp();
	resizeEvent();//Для подбора к размеру окна.

	document.getElementById("groundId").style.height = document.getElementById("bodyId").clientHeight - groundY + "px";
}

function playerAnimation(){

	//Загрузка картинки в сanvas player
	var contx_pl = document.getElementById("plId").getContext("2d");
	document.getElementById("plId").width = imgP.width/4;
	document.getElementById("plId").height = imgP.height/4;
	contx_pl.drawImage(imgP,0,0,imgP.width/4, imgP.height/4,0,0,imgP.width/4, imgP.height/4);
	
	//Загрузка картинки в сanvas weapon
	var contx_wp = document.getElementById("wpId").getContext("2d");
	document.getElementById("wpId").width = imgWp.width/2;
	document.getElementById("wpId").height = imgWp.height;
	contx_wp.drawImage(imgWp,0,0,imgWp.width/2, imgWp.height,0,0,imgWp.width/2, imgWp.height);
	var timer = 0;

	function foo(){
	
		contx_wp.clearRect(0,0,document.getElementById("wpId").width, document.getElementById("wpId").height);
		if(temp == 0 || temp == 2) {
			contx_wp.drawImage(imgWp,0,0,imgWp.width/2, imgWp.height,0,0,imgWp.width/2, imgWp.height);
		}
		else if(temp == 1 || temp == 3){
			contx_wp.drawImage(imgWp,imgWp.width/2,0,imgWp.width/2, imgWp.height,0,0,imgWp.width/2, imgWp.height);
		}
		timer += 0.1;
	    var x = timer;
	    x = Math.round(x) % (4 * 1);
	    contx_pl.clearRect(0,0,document.getElementById("plId").width,document.getElementById("plId").height);
	    contx_pl.drawImage(imgP,x * imgP.width/4,temp * imgP.height/4,imgP.width/4, imgP.height/4,0,0,imgP.width/4, imgP.height/4);
	}
	setInterval(foo,10);
}

function controlPlayerUp(event){
	if(event.keyCode == 39){
		clearInterval(gR);
		if(gL == null)
			temp = 2;
		gR=null;
	}
	else if(event.keyCode == 37){
		clearInterval(gL);
		if(gR == null)
			temp = 3;
		gL=null;
	}
}

function controlPlayerDown(event){
	var pl = document.getElementById("player");
	switch(event.keyCode){
    case 38:
    	if(thread == null){
    		document.getElementById("jumpu").play();
    		x_jump = 0;
        	thread = setInterval(jump, 15);
   		}
        break;
    case 37:
    	if(gL == null){
    		temp = 1;
 
        	document.getElementById("wpId").style.left = 4;
        	gL = setInterval(function(){
        		if(pl.offsetLeft > 0) pl.style.left = pl.offsetLeft - speedRun + "px";
        	}, 10);
        	
        }
        break;
    case 39:
    	if(gR == null){
    		temp = 0;

        	document.getElementById("wpId").style.left = 140;
        	gR = setInterval(function(){
        		if(pl.offsetLeft + document.getElementById("wpId").offsetLeft + 85 < document.getElementById("bodyId").clientWidth) pl.style.left = pl.offsetLeft + speedRun + "px";
        	}, 10);
        }
        break;
    }
}

function jump(){
	x_jump += 0.1;
	var pl = document.getElementById("player");
	var y = -(Math.sin(x_jump) * 10);
	var max = 0;
	if(pl.offsetTop > max){
		max = pl.offsetTop;
		jumpT = true;
	}
	else if(jumpT == true && pl.offsetTop < max){ maxY = y; jumpF = true;}
	pl.style.top = pl.offsetTop + (jumpF == true ? maxY : y) + "px";
	
	if(pl.offsetTop + 68 + 6 >= groundY ){
		maxY = 0;
		jumpF = false;
		x_jump = 0;
		jumpT = false;
		clearInterval(thread);
		thread = null;
	}
}

function resizeEvent(){
	groundY = document.getElementById("bodyId").clientHeight - 100;

	document.getElementById("groundId").style.width = document.getElementById("bodyId").clientWidth - 6 + "px";
	document.getElementById("groundId").style.top = groundY - 6 + "px";
	document.getElementById("player").style.top = groundY - 68 - 6 +  "px";
	var mobs = document.getElementsByClassName('mob');
	for(var i = 0; i < mobs.length; i++){
		mobs[i].style.top = groundY - 67 + "px";
	}
}