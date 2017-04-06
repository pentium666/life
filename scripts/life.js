console.log("hello there");

function elt(tag, cl) {
	var el = document.createElement(tag);
	if(cl) {
		el.className = cl;
	}
	return el;
}

function Display(game) {
	this.game = game;
	this.grid = document.createElement("table");
	this.width = game.width;
	this.height = game.height;
	for(var i = 0; i < y; i++) {
		var row = document.createElement("tr");
		for(var j = 0; j < x; j++) {
			var cell = elt("td", "cell off");
			cell.addEventListener("mousedown", function() {
				this.game.toggle(x, y);
			});
			row.appendChild(cell);
		}
		this.grid.appendChild(row);
	}
}

Display.prototype.render = function (game) {
	for(var y = 0; y < this.height; y++) {
		for(var x = 0; x < this.width; x++) {
			this.grid[x][y].className = game.grid[x][y] ? "on" : "off";
		}
	}
};

function Game(x, y) {
	this.width = x;
	this.height = y;
	this.grid = [];
	for(var i = 0; i < y; i++) {
		var row = [];
		for(var j = 0; j < x; j++) {
			row[j] = false;
		}
		grid.push(row);
	}
}

game.prototype.toggle = function(x, y) {
	var state = this.grid[x][y];
	state = !state;
	this.grid.[x][y] = state;

}

game.prototype.advance = function () {
	var next = [];
};

var game = new Game(10, 10);
var display = new Display(game);
document.getElementById("board").appendChild(display.grid);
