import { useState } from 'react'
import './App.css'

const TURNS = {
  X: "x",
  O: "o"
}

const PATRONS = [
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  const [table, setTable] = useState(Array(9).fill(null))  
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  const [isEmpate, setIsEmpate] = useState(false)
  const Square = ()=> {

  }

  const checkEmpate = (tableToCheck)=>{
    if(tableToCheck.every(element=> element !== null)) setIsEmpate(true)
  }

  const handleClick = (index)=>{
    if(table[index]) return

    turn === TURNS.X ? setTurn(TURNS.O) : setTurn(TURNS.X)
    const newTable = [...table]
    newTable[index] = turn
    setTable(newTable) 
    isWinner(newTable)    
  }  

  const resetGame = ()=> {
    setTable(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }  

  const isWinner = (boardToCheck)=> {    
    for(const patron of PATRONS) {
      const [a,b,c] = patron   
      
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        setWinner(boardToCheck[a])
        return
      }
      else {
        setIsEmpate(boardToCheck)
      }
    }

    return null
  }

  return (
    <main>
      <h1>Tic Tac Game</h1>
      <ul className="table">
        {table.map((value,index)=> (
          <li className="square" key={index} onClick={()=>{handleClick(index)}}>{value}</li>
        ))}
      </ul>

      {winner && (
        <section className="section-modal">
          <div className="modal">
            <h1>El Ganador es "{ winner }"</h1>
            <button onClick={ resetGame }>Reset Game</button>
          </div>
        </section>
      )}

      {isEmpate && (
        <section className="section-modal">
        <div className="modal">
          <h1>Empate</h1>
          <button onClick={ resetGame }>Reset Game</button>
        </div>
      </section>
      )}
    </main>
  )
}

export default App
