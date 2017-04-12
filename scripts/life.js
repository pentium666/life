function elt(tag, cl) {
	var el = document.createElement(tag);
	if(cl) {
		el.className = cl;
	}
	return el;
}

function toggle(x, y) {
	if(window.notoggle == true) {
		window.notoggle = false;
		return;
	}
	var state = game.grid[y][x];
	state = !state;
	game.grid[y][x] = state;
	display.set(y, x, state);
}

function grid(height, width, random) {
	var arr = [];
	for(var y = 0; y < height; y++) {
		var row = [];
		for(var x = 0; x < width; x++) {
			if(random) {
				console.log("random");
				row.push(Math.random() < .5);
			}
			else {
				row.push(false);
			}
		}
		arr.push(row);
	}
	return arr;
}

function Display(game) {
	this.game = game;
	this.topDiv = elt('div', 'life-board');
	this.grid = document.createElement("table");
	this.width = game.width;
	this.height = game.height;
	this.grid.style.width = (game.width * 30 * 1.15384615385) + 'px';
	this.grid.style.height = (game.height * 30) + 'px';
	for(var y = 0; y < this.height; y++) {
		var row = document.createElement("tr");
		for(var x = 0; x < this.width; x++) {
			var cell = elt("td", "cell off");
			cell.id = x + "-" + y;
			cell.setAttribute("x", x);
			cell.setAttribute("y", y);
			cell.setAttribute("onclick", "toggle("+x+","+y+");");
			row.appendChild(cell);
		}
		this.grid.appendChild(row);
	}
	this.topDiv.appendChild(this.grid);
	Array.prototype.slice.call(this.grid);
}

Display.prototype.set = function(y, x, on) {
	var cell = document.getElementById(x + "-" + y);
	cell.classList.remove("on");
	if(on) {
		cell.classList.add("on");
	}
}

Display.prototype.render = function(game) {
	for(var y = 0; y < this.height; y++) {
		for(var x = 0; x < this.width; x++) {
			this.set(y, x, this.game.grid[y][x]);
		}
	}
};

function Game(x, y) {
	this.width = x;
	this.height = y;
	this.grid = grid(y, x);
}

//counts neighbors
Game.prototype.neighbors = function(y, x) {
	var n = 0;
	for(var i = -1; i <= 1; i++) {
		if(y+i >= 0 && y+i < this.height) {
			for(var j = -1; j <= 1; j++) {
				if(x+j >= 0 && x+j < this.width && this.grid[y+i][x+j]) {
					n++;
				}
			}
		}
	}
	n -= this.grid[y][x];
	return n;
}

//moves to next step in simulation
Game.prototype.advance = function () {
	var next = grid(this.height, this.width);

	for(var y = 0; y < this.height; y++) {
		for(var x = 0; x < this.width; x++) {
			var cell = this.grid[y][x];
			var neighbors = this.neighbors(y, x);
			//action for live cells
			if(cell) {
				if(neighbors < 2 || neighbors > 3) {
					cell = false;
				}
			}
			else if(neighbors == 3) {
				cell = true;
			}
			next[y][x] = cell;
		}
	}
	this.grid = next;
};

Game.prototype.next = function() {
	game.advance();
	display.render(this);
};

var game = new Game(200, 200);
var display = new Display(game);
document.getElementById('board').appendChild(display.topDiv);
display.topDiv.scrollLeft = 1000;
display.topDiv.scrollTop = 1000;
window.zoom = .535;
display.topDiv.style.zoom = ".535";
window.speed = 500;


function start(x) {
	var button = document.getElementById("life-start");
	if(!x) {
		stop(button);
		return;
	}
	window.interval = setInterval(game.next, window.s);
	button.setAttribute("onclick", "start(0);");
	button.innerHTML = "Pause";
}

function stop(button) {
	clearInterval(window.interval);
	button.innerHTML = "Start";
	button.setAttribute("onclick", "start(1);");
}

function clearBoard() {
	console.log("board cleared");
	game.grid = grid(game.height, game.width);
	display.render(game);
}

function randBoard() {
	console.log("board randomized");
	game.grid = grid(game.height, game.width, true);
	console.log(game.grid);
	display.render(game);
}

var speed = document.getElementById("life-speed");
speed.addEventListener("change", function() {
	console.log(speed.value);
	window.s = 1000 - 10*speed.value;
	start(0);
	start(1);
});

document.addEventListener("mousemove", function(event) {
	window.mouseX = event.screenX;
	window.mouseY = event.screenY;
});

display.topDiv.addEventListener("mousedown", function(event){
	window.mousedown = true;
	console.log("start");
	var startX = display.topDiv.scrollLeft;
	var startY = display.topDiv.scrollTop;
	var mouseStartX = window.mouseX;
	var mouseStartY = window.mouseY;
	function drag() {
		display.topDiv.scrollLeft = startX + (mouseStartX - window.mouseX);
		display.topDiv.scrollTop = startY + (mouseStartY - window.mouseY);
		if(Math.abs(mouseStartX - window.mouseX) > 10 || Math.abs(mouseStartY - window.mouseY) > 10) {
			window.notoggle = true;
		}
		if(window.mousedown) {
			requestAnimationFrame(drag);
		}
	}
	requestAnimationFrame(drag);
	event.preventDefault();
});

document.addEventListener("mouseup", function() {
	window.mousedown = false;
});

//zoom
window.zoom = 1;
window.addEventListener("wheel", function(event) {
	function zoom() {
		window.zoom = Math.max(window.zoom + event.deltaY*.005, .4);
		display.topDiv.style.zoom = window.zoom;
	}
	requestAnimationFrame(zoom);
	event.preventDefault();
})
