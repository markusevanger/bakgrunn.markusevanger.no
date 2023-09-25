import React, { useState } from 'react';
import './SettingsMenu.css';
import { useSettings } from './SettingsContext';
import Slider from '@mui/material/Slider';

function SettingsMenu() {
  const { settings, updateSettings } = useSettings();
  const [value, setValue] = useState(4);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleVariableChange = () => {
    // Update settings when a variable needs to change
    updateSettings({ numberOfDepartures: value });
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="settings-menu">
      <div
        className={`settings-icon ${menuVisible ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        {/* Your invisible settings icon */}
      </div>
      {menuVisible && (
        <div className="menu">
          {/* Your menu content */}
          <ul>
            <li>
              <div className='antallStoppDiv'>
                <h2>Antall Stopp:</h2>
                <Slider
                  min={1}
                  max={10}
                  aria-label="Small steps"
                  valueLabelDisplay='auto'
                  value={value}
                  onChange={handleSliderChange}
                />
              </div>
            </li>
          </ul>

          <button onClick={handleVariableChange}>Lagre</button>
        </div>
      )}
    </div>
  );
}

export default SettingsMenu;
