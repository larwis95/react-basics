import { useRef, useEffect } from "react";

// Add comments to explain the code
function Image({ imgUrl }: { imgUrl: string }) {
  const prevUrl = useRef("");

  useEffect(() => {
    prevUrl.current = imgUrl;
  }, [imgUrl]);

  return (
    <div className="image-container">
      <img
        src={imgUrl}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "contain",
        }}
      />
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
