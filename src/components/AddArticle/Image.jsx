import React, { useState } from "react";

export default function Image({ onChange }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [fileName, setFileName] = useState("Dosya Seçilmedi");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setFileName(file.name);
      if (onChange) {
        onChange(event);
      }
    }
  };

  return (
    <>asdasd
      <div className="custom-file-upload">
        <input
          type="file"
          name="image"
          accept="image/*"
          className="form-control"
          onChange={handleFileChange}
          id="file-upload"
        />  {imageUrl ? (
        <img src={imageUrl} alt="Selected" style={{ marginTop: '10px', maxWidth: '100%' }} />
      ) : (
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="file-upload" className="file-upload-label">
            Dosya Seç
          </label>
        </div>
      )}

        
      </div>
    </>
  );
}
