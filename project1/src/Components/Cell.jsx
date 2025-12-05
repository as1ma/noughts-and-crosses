// import { useState } from "react"

function Cell({value, onCellClick}){
    // const [cell, setCell] = useState(null)
    // const [player, setPlayer] = useState(null)

    // function handleClick(){

    //     // setValue('X')
    //     setPlayer('X')
    //     if (player=='X'){
    //         setCell('X')
    //     } else if (player =='O'){
    //         setCell('O')
    //     }else{
    //         return 
    //     }
    // }

    return(
        <button className="cell"
        onClick={onCellClick}
        >
            {value}
        </button>
    )

}

export default Cell