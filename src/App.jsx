import './App.css'
import React, {useState} from 'react'
import Count from './components/Count'
import ChangeBgColor from  './components/BgColor'

function App() {
    const[BgColor, setBgColor] = useState("white")
 
     return (
    
      <div style={{backgroundColor:BgColor, height:"100vh" , width:"100vw", margin:0,padding:0}}>
        <Count/>
        <ChangeBgColor onClick={()=> setBgColor('red')} label="Red "/>
        <ChangeBgColor onClick={()=> setBgColor('blue')}label="blue"/>
        <ChangeBgColor onClick={()=> setBgColor('green')}label="Green"/>
      </div>
    )
}
export default App
