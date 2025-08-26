import React, {useState} from 'react'

const ChangeBgColor = ()=>{
    const[BgColor, setBgColor] = useState("white")

    return(
        <div style={{  backgroundColor: BgColor, 
        height: "100vh", 
        width: "100vw",   
        margin: 0,       
        padding: 0  }}>
            <button onClick={() => setBgColor('red')}>Red</button>
            <button onClick={() => setBgColor('blue')}>Blue</button>
            <button onClick={() => setBgColor('green')}>Green</button>
        </div>
    )
}
export default ChangeBgColor
