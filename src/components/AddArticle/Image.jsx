import React from "react";
import ImageButton from "./ImageButton";
export default function Image({ onChange, imageUrl, setImageUrl }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url); // Resmin URL'sini ayarla
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
          <ImageButton />
        )}
      </div>
    </div>
  );
}
