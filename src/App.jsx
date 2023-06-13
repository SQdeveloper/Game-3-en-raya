import { useState } from 'react'
import { TURNS } from './models/Players'
import { PATRONS } from './models/Patrons'
import './App.css'

function App() {
  const [table, setTable] = useState(Array(9).fill(null))  
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(false)
  const [isEmpate, setIsEmpate] = useState(false)  

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
    setWinner(false)    
    setIsEmpate(false)
  }  

  const isWinner = (boardToCheck)=> {    
    for(const patron of PATRONS) {
      const [a,b,c] = patron   
      
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        setWinner(boardToCheck[a])
        return
      }     
      checkEmpate(boardToCheck)
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
