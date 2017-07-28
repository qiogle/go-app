$( document ).ready(function() {
	drawGridlines();
	drawBoard();
	$("#shortcuts").mouseover(function() {
		$("#shortcut-info").show();
	}).mouseout(function() {
		$("#shortcut-info").hide();
	});
});


var Constants = {
	Colors: {
		White: "w",
		Black: "b"
	},
	Lock: {
		Off: "o",
		White: "w",
		Black: "b"
	}
}

var erase = false;


var color = Constants.Colors.White;
var lockState = Constants.Lock.Off;
var priorState;

	// accept through input 
	var dimension = 9;


	function drawBoard() {


	// create string of html that represents the board
	var board_html = "";

	var board = new Array(dimension);
	for (var i = 0; i < dimension; i++) {
		board[i] = new Array(dimension)
	};


	for (var i = 0; i < dimension; i++) {
		for (var j = 0; j < dimension; j++) {
			var unique_id = "id='" + i + j +"'"

			// 'this' is the element; e.g. <p> ... </p> 
			var board_point = "<button class='none' onclick='move(this)'" + unique_id + ">" 
			board_point += "</button>"

			// add to entire board html
			board_html += board_point
			console.log(board_point)
		};
		board_html += "<br>"
	};

	$("#board").html(board_html);

	console.log(board_html);

};

function drawGridlines() {

	var grid_html = "";

	for (var i = 0; i < dimension - 1; i++) {
		for (var j = 0; j < dimension - 1; j++) {
			var unique_id = "id='grid-" + i + j +"'"

			// 'this' is the element; e.g. <p> ... </p> 
			var grid_unit = "<div " + unique_id + " class='grid-unit'>" 
			grid_unit += "</div>"

			// add to entire board html
			grid_html += grid_unit
			console.log(grid_unit)
		};
		grid_html += "<br>"
	};

	$('#gridlines').html(grid_html);
};

function lock(state) {
	if (state != 'o') {
		priorState = state;
	};
	lockState = state;
	console.log(lockState)
};


// turn on erase mode

function eraseToggle() {
	erase = !erase;
	console.log('eraseToggled');
};

// requires: current color, position (implied by element triggering the function)  
function move(el) {
	if (!erase) {
		console.log("move function occured");
		if (lockState == Constants.Lock.Off) {
			if (priorState) {
				el.setAttribute('class', opposite(priorState))
				priorState = null;
			} else {
				el.setAttribute('class', color)
			}
			changeColor();
		} else {
			el.setAttribute('class', lockState)
		};
	} else {
		el.setAttribute('class', 'none');
	}
	console.log(priorState)
	console.log(el)
	console.log(lockState)
	console.log(erase)
	// switches color in anticipation of next move
};

function opposite(oldColor) {
	if (oldColor == Constants.Colors.White) {
		return Constants.Colors.Black;
	} else {
		return Constants.Colors.White;
	}
}

function changeColor() {
	if (color == Constants.Colors.White) {
		color = Constants.Colors.Black;
	} else {
		color = Constants.Colors.White;
	}
}

function selectRadioButton(btn) {
	document.getElementById("radio-white").checked = true;
}

Mousetrap.bind('w', function() {$("#radio-white").trigger('click');
});
Mousetrap.bind('b', function() {$("#radio-black").trigger('click');
});
Mousetrap.bind('c', function() {$("#radio-off").trigger('click');
});
Mousetrap.bind('e', function() {$("#erase-toggle").trigger('click');
});