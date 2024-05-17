import React, { useState } from "react";

export default function Image({ onChange }) {
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      if (onChange) {
        onChange(event);
      }
    }
  };

  return (
    <div className="custom-file-container">
      <div className="custom-file-container-upload">
        <input
          type="file"
          name="image"
          accept="image/*"
          className="form-control"
          onChange={handleFileChange}
          id="file-upload"
        />{" "}
        {imageUrl ? (
          <img src={imageUrl} alt="Selected" className="img" />
        ) : (
          <div className="custom-file-container-upload-btn">
            <label htmlFor="file-upload" className="label">
              <span className="plus">+</span>
              <span className="text">GÖRSEL</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
