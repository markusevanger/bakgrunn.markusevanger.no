import Tavle from './components/Tavle'
import SettingsMenu from './components/SettingsMenu';
import Background from './components/Background';
import { SettingsProvider, useSettings } from './components/SettingsContext'; // Import SettingsProvider and useSettings



function App() {

  console.log("Versjon: 6");

  return (
    <>
      <SettingsProvider>
        <SettingsMenu/>
        <Tavle className="tavle"></Tavle>
        <Background className="bakgrunn" />
              
      </SettingsProvider>
    </>
  )
}

export default App
