import './App.css'
// import React, { useState } from 'react'
// import Count from './components/Count'
// import ChangeBgColor from './components/BgColor'
// import DetailsForm from './components/DetailsForm'
// import TodoList from './components/TodoList'
import UserTable from './components/UserTable'

function App() {
  // const [bgColor, setBgColor] = useState("white")

  return (
    <div>
      {/* <Count/> */}
      {/* <ChangeBgColor onClick={() => setBgColor('red')} label="Red "/>
      <ChangeBgColor onClick={() => setBgColor('blue')} label="Blue"/>
      <ChangeBgColor onClick={() => setBgColor('green')} label="Green"/>
      <DetailsForm/> */}
      {/* <TodoList/> */}
      <UserTable />
    </div>
  )
}

export default App
