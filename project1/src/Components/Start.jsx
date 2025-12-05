
export default function Start({setMode}){
    return(
        <div className="start-page">
            <h1>Noughts & Crosses</h1>
            <h2 className="start-title">CHOOSE GAME MODE</h2>
            <input 
                type="button" 
                className="game-mode-button" 
                value="Human vs Human" 
                onClick={()=> setMode("hvh")}/>
            <input 
                type="button" 
                className="game-mode-button" 
                value="Human vs Computer" 
                onClick={()=> setMode("hvc")}/>
        </div>
    )
}