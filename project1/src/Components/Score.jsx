
export default function Score({scoresList}){
    const [scoreX, scoreO] = scoresList
    return(
        <>
        <div className="scoreboard">
            <h2>Scores</h2>
            <table border='1' className="score-table">
                        <tr>
                            <td> Player X:</td>
                            <tr>{scoreX}</tr>
                            <td> Player O:</td>
                            <tr>{scoreO}</tr>
                        </tr>
            </table>
            {/* <h3>Player X: {} </h3>
            <h3>Player O: {} </h3> */}
        </div>
        </>
    )
}
