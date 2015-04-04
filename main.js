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
		$(".victory1").addClass("hidden");
		$(".victory2").addClass("hidden");
		if (turn == 1)
					turn++;
				else
					turn--;
	});

	$("#reset").click( function(){
		$(".gridcell").removeClass("piece1 piece2 clicked");
		$(".victory1").addClass("hidden");
		$(".victory2").addClass("hidden");
		turn = 1
	});

	function canHasWin(curColumn, curRow) {
		var start = board[curRow][curColumn];
		if(checkUpDown(start)){
			if(turn == 2){
				$(".victory1").removeClass("hidden");
			}else if(turn == 1){
				$(".victory2").removeClass("hidden");
			}
		}else if(checkLeftRight(start)){
			if(turn == 2){
				$(".victory1").removeClass("hidden");
			}else if(turn == 1){
				$(".victory2").removeClass("hidden");
			}
		}else if(checkUpLeftandDownRight(start)){
			if(turn == 2){
				$(".victory1").removeClass("hidden");
			}else if(turn == 1){
				$(".victory2").removeClass("hidden");
			}
		}else if(checkUpRightandDownLeft(start)){
			if(turn == 2){
				console.log("RED WINS!")
				$(".victory1").removeClass("hidden");
			}else if(turn == 1){
				console.log("BLACK WINS!")
				$(".victory2").removeClass("hidden");
			}
		}

		function checkUpDown(start){
			var numFound = 0;
			for(i=curRow; i>0; --i){
				if(board[i][curColumn]==start)
					numFound++;
				else
					break;
			}
			for(i=curRow+1; i<board.length; ++i){
				if(board[i][curColumn]==start)
					numFound++;
				else
					break;
			}

			return (numFound >= 4);
		}

		function checkLeftRight(start) {
			var numFound = 0;
			for(i=curColumn; i>0; --i){
				if(board[curRow][i]==start)
					numFound++;
				else
					break;	
			}
			for(i=curColumn+1; i<board[curRow].length; ++i){
				if(board[curRow][i]==start)
					numFound++
				else
					break;
			}

			return (numFound >=4);
		}
		//Diagonals are checked, function names are confusing
		function checkUpLeftandDownRight(start) {
			numFound = -1; //This is a little "hacky", if problems occur, change it
			for(i=0; i<4; ++i){
				if(board[curRow+i] !== undefined){
					if(board[curRow+i][curColumn+i]==start)
						numFound++;
				}
				if(board[curRow-i] !== undefined){
					if(board[curRow-i][curColumn-i]==start)
						numFound++;
				}
			}

			return (numFound>=4);
		}

		function checkUpRightandDownLeft(start) {
			numFound = -1;
			for (i=0; i<4; ++i){
				if(board[curRow-i] !== undefined){
					if(board[curRow-i][curColumn+i]==start){
						numFound++;
					}
				}
				if(board[curRow+i] !== undefined){
					if(board[curRow+i][curColumn-i]==start){						numFound++;
					}
				}
			}
			return (numFound>=4);
		}
	}


});


