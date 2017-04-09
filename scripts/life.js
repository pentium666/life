function elt(tag, cl) {
	var el = document.createElement(tag);
	if(cl) {
		el.className = cl;
	}
	return el;
}

function toggle(x, y) {
	var state = game.grid[y][x];
	state = !state;
	game.grid[y][x] = state;
	display.set(y, x, state);
}

function grid(height, width) {
	var arr = [];
	for(var y = 0; y < height; y++) {
		var row = [];
		for(var x = 0; x < width; x++) {
			row.push(false);
		}
		arr.push(row);
	}
	return arr;
}

function Display(game) {
	this.game = game;
	this.grid = document.createElement("table");
	this.width = game.width;
	this.height = game.height;
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
	console.log(this.grid);
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

var game = new Game(30, 15);
var display = new Display(game);
document.getElementById("board").appendChild(display.grid);

function start(x) {
	var button = document.getElementById("life-start");
	if(!x) {
		stop(button);
		return;
	}
	window.interval = setInterval(game.next, 500);
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
