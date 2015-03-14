$(document).ready(function() {
	var history = [];
	var board = [[],[],[],[],[],[]];
	var turn = 1;


	$(".gridcell").click(function(){

		var curColumn = $(this).index();
		var curRow;
		var columnCells = $(".col" + (curColumn+1));

		// Loop until an empty cell is found in the column and then break out
		for(var n = 5; n >= 0; n--){
			if ( ! $(columnCells[n]).hasClass("clicked") ){
				history.push(columnCells[n]);
				board[n][curColumn] = turn;
				curRow = n;
				$(columnCells[n]).addClass("piece"+turn+" clicked");

				if (turn == 1)
					turn++;
				else
					turn--;

				break;
			}
		}		
		

		// console.log("Column is: " + $(this).data("col") );
		console.info(board);


		// Use .index() function to figure out what column we're in


		//Then select all elements in that column 
			// and loop through them to figure out where to place the piece

		canHasWin(curColumn, curRow);


	});

	$("#undo").click(function(){
		$(history.pop()).removeClass("piece1 piece2 clicked");
	});

	$("#reset").click( function(){
		$(".gridcell").removeClass("piece1 piece2 clicked");
	});

	function canHasWin(curColumn, curRow) {
		var start = board[curRow][curColumn];
		if(checkUpDown(start)){
			console.log('YOU WIN!');
		}

		function checkUpDown(start){
			var numFound = 1;
			for(i=curRow; i>0; --i){
				if(board[i][curColumn]==start)
					numFound++;
				else
					break;
			}
			for (i=curRow; i<board.length; ++i){
				if(board[i][curColumn]==start)
					numFound++;
				else
					break;
			}

			return (numFound >= 4);
		}
	}


});


