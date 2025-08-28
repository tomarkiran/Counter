import React from 'react'

const ChangeBgColor = ({onClick, label})=>{
 return(
       <div>
           <button onClick={onClick}>{label}</button>
       </div>
   )
}
export default ChangeBgColor
