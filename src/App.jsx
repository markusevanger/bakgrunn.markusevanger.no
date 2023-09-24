import { useState } from 'react'
import Tavle from './components/Tavle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Tavle stopId="NSR:StopPlace:6009"></Tavle>
    </>
  )
}

export default App
