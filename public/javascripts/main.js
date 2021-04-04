function init_board() {
	console.log("Starting.")
}
function row_to_data(a, currentValue, index, array) {
	// console.log(`${index}: ${typeof a}, ${currentValue}, ${array}`)
	// console.log(Array.from(currentValue.cells).filter(c => !c.classList.contains("hint")))
	a[index] = Array.from(currentValue.cells).filter(c => !c.classList.contains("hint")).map(c => c.firstChild.checked)
	return a
}
transpose = m => m[0].map((x, i) => m.map(x => x[i]))
function row_to_hint(a, c, index, array) {
	// console.log(`${index}: ${a}, ${c}`)
	if (
		(c === true && a[a.length - 1] == 0)
		|| (array[index - 1] === true && c === true)
	) {
		a[a.length - 1] += 1
	} else if (array[index - 1] === false && c === true) {
		a.push(1)
	}
	return a
}
function y_hints(board) {
	return board.map(r => {
		return r.reduce(row_to_hint, [0])
	})
}
function x_hints(board) {
	return y_hints(transpose(board))
}
function board_to_hints(board) {
	x =x_hints(board)
	y =y_hints(board)
	xhints = "x_hints: " + x_hints(board).join(", ")
	yhints = "y_hints: " + y_hints(board).join(", ")
	return { y: y, x: x }
}

function hints_on_board(hints){
	hints.x.forEach((hint,index) => {
		$(`#hintx${index}`).html(hint.join(", "))
	})
	hints.y.forEach((hint,index) => {
		$(`#hinty${index}`).html(hint.join(", "))
	})
	$("#json").val(JSON.stringify(hints, space=4))
}

function verify(){
	board = Array.from(
		$("#board").children()[0].rows
	).filter(
		row => !row.classList.contains("h")
	).reduce(row_to_data, initialValue = [])
	hints = board_to_hints(board)
	hints.x.forEach((hint,index) => {
		if ($(`#hintx${index}`).html() == hint.join(" ")){
			$(`#hintx${index}`).addClass("bg-success")
		} else {
			$(`#hintx${index}`).removeClass("bg-success")
		}
	})
	hints.y.forEach((hint,index) => {
		if ($(`#hinty${index}`).html() == hint.join(" ")){
			$(`#hinty${index}`).addClass("bg-success")
		} else {
			$(`#hinty${index}`).removeClass("bg-success")
		}
	})
}

function compute() {
	console.log("starting.")
	board = Array.from(
		$("#board").children()[0].rows
	).filter(
		row => !row.classList.contains("h")
	).reduce(row_to_data, initialValue = [])
	console.log(board)
	console.log(board_to_hints(board))
	hints_on_board(board_to_hints(board))
}