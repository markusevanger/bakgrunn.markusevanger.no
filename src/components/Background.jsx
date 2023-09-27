import React from 'react';
import { useSettings } from './SettingsContext';


const Background = () => {

    const { settings } = useSettings()
    const backgroundStyle = {
        // Define your background styles here
        backgroundImage: `url(${settings.backgroundImg})`, // Example background image URL
    };

    return (
        <div className="backgroundContent" style={backgroundStyle}> </div>
    );
}

export default Background;
