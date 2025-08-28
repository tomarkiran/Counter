import React, { useState } from 'react'

const Count = () => {
  const [count, setCount] = useState(0)
   return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => { if (count > 0) setCount(count - 1) }}>Decrease</button>
    </div>
  )
}
export default Count
