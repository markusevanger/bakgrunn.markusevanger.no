import React, { useState } from 'react';
import './SettingsMenu.css';

function ImageUploader({ backgroundImage, setBackgroundImage }) {
  const [selectedImage, setSelectedImage] = useState('/51_upscaled.png');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <input className='inputbutton' type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <img src={backgroundImage} alt="Selected Background" style={{ width: "100%", height: "auto" }} />
      )}
    </div>
  );
}

export default ImageUploader;
