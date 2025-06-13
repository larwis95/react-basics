import { useRef, useEffect } from "react";

// Add comments to explain the code
function Image({ imgUrl }: { imgUrl: string }) {
  // TODO: What does useRef do here?
  const prevUrl = useRef("");

  // TODO: What does this effect do?
  useEffect(() => {
    prevUrl.current = imgUrl;
  }, [imgUrl]);

  return (
    // TODO: What does this component render?
    <div className="image-container">
      <img
        src={imgUrl}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "contain",
        }}
      />
      {/* TODO: What type of rendering is this? */}
      {prevUrl.current && (
        <a href={prevUrl.current} target="_blank" rel="noopener noreferrer">
          Previous Image: {prevUrl.current}
        </a>
      )}
      <p>Current Image: {imgUrl}</p>
    </div>
  );
}

export default Image;
