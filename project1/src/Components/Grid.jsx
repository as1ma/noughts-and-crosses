import { useState, useRef, useEffect } from "react"
import Cell from "./Cell"
import Score from "./Score"

function Grid({gameMode, onRestart}){
    const [cells, setCells] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)
    const [scores, setScores] = useState([0,0])
    const hasScoredRef = useRef(false)
    const winner = calculateWinner(cells)
    let status

    //human vs human OR human vs computer (hvc)
    // if (gameMode === "hvc"){
    //     alert("computer")
    // }

    useEffect(()=> {
        if (gameMode !== "hvc") return
        if (winner) return 

        const humanPlayer = "X"
        const compPlayer = "O"
        const isComputerTurn = (!xIsNext && compPlayer === 'O' || (xIsNext && compPlayer === 'X'))

        if (isComputerTurn) {
            const time = setTimeout(() => {
                const move = chooseComputerMove(cells, compPlayer, humanPlayer)

                if (move != null){
                    const nextCell = cells.slice()
                    nextCell[move] = compPlayer
                    setCells(nextCell)
                    setXIsNext(!xIsNext)
                }
            }, 400)
            return () => clearTimeout(time)
        }
    }, [cells, xIsNext, gameMode, winner])

    console.log(cells)

    function handleClick(i){
        if (cells[i] || calculateWinner(cells)){
            return
        }
        const nextCell = cells.slice()
        if(xIsNext){
            nextCell[i] = 'X'
        } else {
            nextCell[i] = 'O'
        }

        setCells(nextCell)
        setXIsNext(!xIsNext)
    }

    useEffect(()=>{
        if (winner && !hasScoredRef.current){
            setScores(([scoresX, scoresO]) => 
            winner === 'X' ? [scoresX+1, scoresO] : [scoresX, scoresO + 1])
            hasScoredRef.current = true
    }
    }, [winner])

    if (winner){
        status = `Winner: ${winner}`

    } else if (!winner && cells.every((c) => c !== null)){
        status = 'Draw'
    }else {
        status = 'Next Player: ' + (xIsNext ? 'X' : 'O')
    }

    function resetGame(){
        setCells((Array(9).fill(null)))
        setXIsNext(true)
        hasScoredRef.current = false;
    }

    function goToStart(){
        resetGame()
        if (onRestart) onRestart()
    }

    return(
        <div className="game-grid">
            <h1>Noughts & Crosses</h1>
            <div className="status">{status}</div>
            <div className="game-row">
                <Cell value={cells[0]} onCellClick={()=> handleClick(0)}/>
                <Cell value={cells[1]} onCellClick={()=> handleClick(1)}/>
                <Cell value={cells[2]} onCellClick={()=> handleClick(2)}/>
            </div>
            <div className="game-row">
                <Cell value={cells[3]} onCellClick={()=> handleClick(3)}/>
                <Cell value={cells[4]} onCellClick={()=> handleClick(4)}/>
                <Cell value={cells[5]} onCellClick={()=> handleClick(5)} />
            </div>
            <div className="game-row">
                <Cell value={cells[6]} onCellClick={()=> handleClick(6)}/>
                <Cell value={cells[7]} onCellClick={()=> handleClick(7)}/>
                <Cell value={cells[8]} onCellClick={()=> handleClick(8)}/>
            </div>
            <div className="buttons">
                <input className="reset-btn" type="button" value="Reset" onClick={resetGame}></input>
                <input className="reset-btn" type="button" value="Mode" onClick={goToStart}></input>
            </div>
            <Score scoresList={scores} />
        </div>
    )
}

export default Grid
    
function calculateWinner(cells){
    const possibleWins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i=0; i < possibleWins.length; i++){
        const [a, b, c] = possibleWins[i]
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]){
            return cells[a]
        }
    }
    return null
}

function chooseComputerMove(board, compPlayer, humanPlayer){
    //Win
    const win = findWinningMove(board, compPlayer)
    if (win != null) return win

    //Block
    const block = findWinningMove(board, humanPlayer)
    if (block!= null) return block

    //Centre
    if (board[4] == null) return 4

    //Corner
    const corners = [0,2,6,8].filter((i) => board[i] == null)
    if (corners.length) return corners[0]

    //Side
    const sides = [1, 3, 5, 7].filter((i)=> board[i] == null)
    if (sides.length) return sides[0]

    return null
}

function findWinningMove(board, mark) {
  for (let i = 0; i < 9; i++) {
    if (board[i] == null) {
      const copy = board.slice();
      copy[i] = mark;
      if (calculateWinner(copy) === mark) {
        return i;
      }
    }
  }
  return null;
}

