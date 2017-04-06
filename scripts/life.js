console.log("hello there");

function elt(tag, )

function Board(x, y) {
	this.grid = document.createElement("table");
	for(var i = 0; i < y; i++) {
		var row = document.createElement("tr");
		for(var j = 0; j < x; j++) {
			row.appendChild(document.createElement("td"));
		}
		this.grid.appendChild(row);
	}
}

var board = new Board(10, 10);
document.getElementById("board").appendChild(board.grid);
