console.log("hello there");

function elt(tag, cl) {
	var el = document.createElement(tag);
	if(cl) {
		el.className = cl;
	}
	return el;
}

function Display(x, y) {
	this.grid = document.createElement("table");
	this.width = x;
	this.height = y;
	for(var i = 0; i < y; i++) {
		var row = document.createElement("tr");
		for(var j = 0; j < x; j++) {
			row.appendChild(elt("td", "cell off"));
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
			row[j] = 0;
		}
		grid.push(row);
	}
}

var display = new Display(10, 10);
var game = new Game(10, 10);
document.getElementById("board").appendChild(display.grid);
