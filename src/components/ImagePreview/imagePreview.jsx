import React, { useState } from "react";
import "./imagePreview.css";
function ImagePreview({ imageUrl, className }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <img
        src={imageUrl}
        alt="Preview"
        style={{ maxWidth: "100%", cursor: "pointer" }}
        className={`small-image ${className && "moreSmall"}`}
        onClick={toggleExpand}
      />
      {isExpanded && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={toggleExpand} // Close on click outside the image
        >
          <img
            src={imageUrl}
            alt="Expanded Preview"
            style={{ maxHeight: "80%", maxWidth: "80%", objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
}

export default ImagePreview;
