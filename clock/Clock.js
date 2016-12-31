var Radius = 8;
var MarginLeft = 60;
var MarginTop = 30;
var curShowTime = 0;
var balls = [];
var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
window.onload = function() {
	var canvas = document.getElementById('canvas');
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	MarginLeft = Math.round(canvas.width/10);
	MarginTop = Math.round(MarginLeft);
	Radius = Math.round(canvas.width*4/5/108)-1;
	if (canvas.getContext('2d')) {
		var c = canvas.getContext('2d');
		// curShowTime = curCountDown();
		curShowTime = new Date();
		setInterval(function () {
			render(c);
			update(c);
		},50);
	}

};


// function curCountDown() {
	// var endTime = new Date(2015, 11, 29);
	// var nowTime = new Date();
	// var countDown = Math.round((endTime.getTime() - nowTime.getTime()) / 1000);
	// return countDown >= 0 ? countDown : 0;
// }
function update(cxc) {
	// var nextShowTime = curCountDown();
	// var nextHours = parseInt(nextShowTime/3600);
	// var nextMinites = parseInt((nextShowTime -nextHours*3600)/60);
	// var nextSeconds = nextShowTime%60;
	var nextShowTime = new Date();
	var nextHours = nextShowTime.getHours();
	var nextMinites = nextShowTime.getMinutes();
	var nextSeconds = nextShowTime.getSeconds();

	// var hours = parseInt(curShowTime/3600);
	// var minites = parseInt((curShowTime -hours*3600)/60);
	// var seconds = curShowTime%60;
	var hours = curShowTime.getHours();
	var minites =curShowTime.getMinutes();
	var seconds = curShowTime.getSeconds();

	if (nextSeconds !== seconds) {
		if (parseInt(nextHours/10)!== parseInt(hours/10)) {
			addBalls(MarginLeft,MarginTop,parseInt(hours/10));
		}
		if (parseInt(nextHours%10)!== parseInt(hours%10)) {
			addBalls(MarginLeft + 15 * (Radius + 1), MarginTop, parseInt(hours % 10));
		}
		if (parseInt(nextMinites/10)!== parseInt(minites/10)) {
			addBalls(MarginLeft + 39 * (Radius + 1), MarginTop, parseInt(minites / 10));
		}
		if (parseInt(nextMinites%10)!== parseInt(minites%10)) {
			addBalls(MarginLeft + 54 * (Radius + 1), MarginTop, parseInt(minites % 10));
		}
		if (parseInt(nextSeconds/10)!== parseInt(seconds/10)) {
			addBalls(MarginLeft + 78 * (Radius + 1), MarginTop, parseInt(seconds / 10));
		}
		if (parseInt(nextSeconds%10)!==parseInt(seconds%10)) {
			addBalls(MarginLeft + 93 * (Radius + 1), MarginTop, parseInt(seconds % 10));
		}
		curShowTime = nextShowTime;
	}
	updateBalls(cxc);
	// console.log(balls.length);
}

function addBalls(x,y,num) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j]==1) {
				var ball = {
				x:x + j * 2 * (Radius + 1) + (Radius + 1),
				y:y + i * 2 * (Radius + 1) + (Radius + 1),
				vx: (Math.pow(-1,Math.ceil(Math.random()*1000)))*4,
				vy: -5,
				g:1.5+Math.random(),
				color: colors[Math.floor(Math.random()*colors.length)],
				};
			balls.push(ball);
			}
		}
	}
}
function updateBalls(cxc) {
	var count = 0;
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		// balls[i].vx -=balls[i].g;
		balls[i].y +=balls[i].vy;
		balls[i].vy+=balls[i].g;
		if (balls[i].y>=cxc.canvas.height-Radius ) {
		balls[i].y = cxc.canvas.height-Radius;
		balls[i].vy = - balls[i].vy*0.5;
		}
	}
	for (var j = 0; j < balls.length; j++) {
			if (balls[j].x +Radius>0 && balls[j].x-Radius < cxc.canvas.width){
			balls[count++] =balls[j];
		}
	}
		while(balls.length >Math.min(count,500)){
			balls.pop();
		}
}


function render(cxc) {
	cxc.clearRect(0,0,cxc.canvas.width,cxc.canvas.height);
	// var hours = parseInt(curShowTime/3600);
	// var minites = parseInt((curShowTime -hours*3600)/60);
	// var seconds = curShowTime%60;
	var hours = curShowTime.getHours();
	var minites =curShowTime.getMinutes();
	var seconds = curShowTime.getSeconds();
	drowing(MarginLeft, MarginTop, parseInt(hours / 10), cxc);
	drowing(MarginLeft + 15 * (Radius + 1), MarginTop, parseInt(hours % 10), cxc);
	drowing(MarginLeft + 30 * (Radius + 1), MarginTop, 10, cxc);
	drowing(MarginLeft + 39 * (Radius + 1), MarginTop, parseInt(minites / 10), cxc);
	drowing(MarginLeft + 54 * (Radius + 1), MarginTop, parseInt(minites % 10), cxc);
	drowing(MarginLeft + 69 * (Radius + 1), MarginTop, 10, cxc);
	drowing(MarginLeft + 78 * (Radius + 1), MarginTop, parseInt(seconds / 10), cxc);
	drowing(MarginLeft + 93 * (Radius + 1), MarginTop, parseInt(seconds % 10), cxc);
	for (var i = 0; i < balls.length; i++) {
		cxc.fillStyle=balls[i].color;
		cxc.strokeStyle=balls[i].color;
		cxc.beginPath();
		cxc.arc(balls[i].x, balls[i].y, Radius, 0, Math.PI * 2);
		cxc.closePath();
		cxc.fill();
	}
	cxc.font = Radius*5 +'px Arial';
	cxc.strokeText('Canvas Clock--MXie',MarginLeft,cxc.canvas.height*2/3);
}

function drowing(x, y, num, cxc) {
	cxc.fillStyle = '#005588';
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				cxc.beginPath();
				cxc.arc(x + j * 2 * (Radius + 1) + (Radius + 1), y + i * 2 * (Radius + 1) + (Radius + 1), Radius, 0, Math.PI * 2);
				cxc.closePath();
				cxc.fill();
			}
		}
	}
}
