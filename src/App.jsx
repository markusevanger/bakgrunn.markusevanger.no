import { useState } from 'react'
import Tavle from './components/Tavle'
import SettingsMenu from './components/SettingsMenu';
import { SettingsProvider } from './components/SettingsContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SettingsProvider>
        <SettingsMenu/>
        <Tavle className="tavle" stopId="NSR:StopPlace:6009"></Tavle>
      </SettingsProvider>
    </>
  )
}

export default App
