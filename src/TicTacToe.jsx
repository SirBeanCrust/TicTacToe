import {useState} from "react";

function Square({value, onSquareClick}) {

    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}
function Board({ move, xTurn, squares, onPlay, winner, draw, boardWidth, boardHeight}) {

    //Handle square click
    function handleClick(index) {
    if (squares[index] || winner) {
            return;
        }
        const squaresCopy = squares.slice();
        if (xTurn) {
            squaresCopy[index] = "X";
        } else {
            squaresCopy[index] = "O";
        }
        //After new move has been established...=>
        onPlay(squaresCopy);
    }
    
      //Status Variable 
      
      let nextPlayer;
      if (winner) {
          nextPlayer = "Winner: Player " + winner;
      } else if (draw) {
          nextPlayer = "There has been a Draw";
      } else {
          nextPlayer = "Next player: " + (xTurn ? "X" : "O");
      }
      let thisMove = "Move: " + move;
      const status = [
        <div key={1} className="status">{nextPlayer}</div>,
        <div key={2}className="status">{thisMove}</div>,
    ];
    
  
    //Board Display
    
    return (
      
        <>
        <>{status}</>

        {Array(boardHeight).fill(null).map((_,col) => {
          return(
            <div key={col} className="board-column">
            {Array(boardWidth).fill(null).map((_,row) => {
                const index = col * boardWidth + row;
            return (
                <Square
                key = {index}
                value = {squares[index]}
                onSquareClick={() => handleClick(index)}
                />
            );
            })}
            </div>
        );  
        })}
        </>
    )
}
export default function TicTacToe() {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [ascendingOrder, setAscendingOrder] = useState(true);
    const boardWidth = 12;
    const boardHeight = 12;
    const seqLenght = 3;

    const xTurn = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const winCombo = calculateWinner(currentSquares, boardWidth, boardHeight, seqLenght);
    const [winner, setWinner] = useState(null);
    if (winCombo) {
        setWinner(winCombo.winner)
    }
    
    const draw = caluculateDraw(currentMove, winner, boardWidth, boardHeight);


    function checkValuesForDebugging() {
        console.log("currentMove:", currentMove);
        console.log("currentSquares:", currentSquares);
        console.log("winner:", winner);
        console.log("draw:", draw);
        console.log("history:", history);
        console.log("moves:", moves);
    }

    //Implement new move to history
    function handlePlay(squaresCopy) {
        const nextHistory = [...history.slice(0, currentMove + 1), squaresCopy];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
      }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    //History Button List
    const moves = history.map((squares, move) => {
    let description;
    if (move === currentMove) {
        if (move === 0) {
            return;
        } else if (winner) {
            description = "Player" + winner + " won";
        } else if (draw) {
            description = "Drawn";
        } else {
            description = "Current move";
        }
    } else if (move > 0) {
        description = "Go to move #" + move;
    } else {
        description = "Go to game start";
    }
    return (
        <ol key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
        </ol>
        );
    });

    const sortedMoves = ascendingOrder ? moves : moves.slice().reverse();


    return (
        <div className="game">
            <div className="game-board">
                <Board draw={draw} move={currentMove} xTurn={xTurn} squares={currentSquares} onPlay={handlePlay} winner={winner} boardWidth={boardWidth} boardHeight={boardHeight}/>
            </div>
            <div className="game-info">
                <ol>{sortedMoves}</ol>
                <div><button onClick={checkValuesForDebugging}>Check Values</button></div>
                <button onClick={() => setAscendingOrder(!ascendingOrder)}>
                    {ascendingOrder ? 'Sort Descending' : 'Sort Ascending'}
                </button>
            </div>
        </div>
    );
}

function calculateWinner(squares, boardWidth, boardHeight, seqLenght) {

    console.log("Board:", squares)
    
    let lines = [];
    //Difines possible winning combinations and adds them to lines[]:

    //Horizontal Lines
    for (let row = 0; row < boardHeight; row++) {
        lines.push(Array.from({ length: boardWidth }, (_, col) => squares[row * boardWidth + col]));
    }
	
	//Vertical Lines
    for (let col = 0; col < boardWidth; col++) {
        lines.push(Array.from({ length: boardHeight }, (_, row) => squares[row * boardWidth + col]));
    }
	
	//Diagnol Lines (downwards)
	for (let startCol = 0; startCol < boardWidth - seqLenght + 1; startCol++) {
        const line = [];
        for (let col = startCol, row = 0; col < boardWidth && row < boardHeight; col++, row++) {
            line.push(squares[row * boardWidth + col]);
        }
        lines.push(line)
    }
    
    for (let startRow = 1; startRow < boardHeight - seqLenght + 1; startRow++) {
        const line = [];
        for (let row = startRow, col = 0; col < boardWidth && row < boardHeight; col++, row++) {
            line.push(squares[row * boardWidth + col]);
        }
        lines.push(line);
    }
	
	//Diagonal Lines (upwards)
	for (let startCol = 0; startCol < boardWidth - seqLenght + 1; startCol++) {
        const line = [];
        for (let col = startCol, row = boardHeight - 1; col < boardWidth && row > -1; col++, row--) {
            line.push(squares[row * boardWidth + col]);
        }
        lines.push(line);
    }
    
    for (let startRow = boardHeight - 2; startRow > seqLenght - 2; startRow--) {
        const line = [];
        for (let row = startRow, col = 0; col < boardWidth && row > -1; col++, row--) {
            line.push(squares[row * boardWidth + col]);
        }
        lines.push(line);
    }
    //console.log(lines)

	//Check for winner
    //Runs trough lines[] to check if the board contains any winning combinations
    for (let i = 0; i < lines.length  ; i++) {
    const line = lines[i]
    //console.log(line)
    
    for (let j = seqLenght - 1; j < line.length  ; j++) {
        if (line[j] !== null){
            continue;
        }
        if (line[j] == line[j - 1]){
            continue;
        }
        if (line[j] == line[j - 2]){
            return {winner:line[j], square1:j, square2:j - 1, square3:j - 2};
        }
    }
    }
    return null;
}
//return {winner:line[j], square1:j, square2:j - 1, square3:j - 2};
function caluculateDraw(currentMove, winner, boardWidth, boardHeight){
    let draw = null;
    if (currentMove + 1 > boardWidth * boardHeight  && !winner) {
        draw = currentMove
    }
    return draw;
}


