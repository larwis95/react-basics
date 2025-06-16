import { useEffect, useState } from "react";
import Image from "./Image";

function ImageContainer() {
  const [images, setImages] = useState<string[]>();
  const [refetch, setRefetch] = useState(false);

  // Shape of the data returned from the cat api:
  /*  
    [{
      "id":"ebv",
      "url":"https://cdn2.thecatapi.com/images/ebv.jpg",
      "width":176,"height":540,
      "breeds":[],
      "favourite":{}
    }]
  */
  useEffect(
    () => {
      // Finish the code to fetch the data from the url: https://api.thecatapi.com/v1/images/search?limit=3
      // Hint 1: Create a fetching function in the useEffect first, so we don't have a dependency. Should it be async?
      // Hint 2: Where would we set our images state? Maybe at the end of the fetching function

      // fetch function code goes here

      if (!images || refetch) {
        //only fetch if we have no data yet, or we clicked the refetch button.

        setRefetch(false); // Reset refetch state after fetching
      }
    },
    [] // What should be the dependency array here?
  );

  const handleRefetch = () => {
    setRefetch((prev) => !prev);
  };

  return (
    <>
      <div className="images-container">
        {images ? (
          images.map((image, index) => <Image key={index} imgUrl={image} />)
        ) : (
          <p>Loading images...</p>
        )}
      </div>

      <button onClick={handleRefetch} className="refetch-button">
        Refetch Images
      </button>
    </>
  );
}

export default ImageContainer;
