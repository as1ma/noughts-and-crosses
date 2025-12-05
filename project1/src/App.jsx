import './App.css'
import Grid from "./Components/Grid"
import Start from "./Components/Start"
import {useState} from "react"

function App() {
  const [mode, setMode] = useState(null)

  return (
    <>
      {!mode ? (
        <Start mode={mode} setMode={setMode} />
      ) : (
        // <h1>Noughts & Crosses</h1>
        <Grid gameMode={mode} onRestart={() => setMode(null)}/>
      )}
    </>
  )
}

export default App
