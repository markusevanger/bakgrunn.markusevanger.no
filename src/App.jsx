import { useState } from 'react'
import './App.css'
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
