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

      const fetchCats = async () => {
        try {
          const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=6');
          const data = await res.json();
          console.log(data);
          setImages(data.map((img: any) => img.url));
          // any only in this example because we have the structure of data returned from cat api
        }
        catch(e) {
          console.error("No cats, sorry.  Site is down or check your URI.", e);
        }
      };

      if (!images || refetch) {
        //only fetch if we have no data yet, or we clicked the refetch button.
        fetchCats();
        setRefetch(false); // Reset refetch state after fetching
      }
    }, [refetch]
  ); // What should be the dependency array here?

  // refetch, because we are only wanting new images to render when we click the button
  // images already appear when the page first renders, because of the if (!images || refetch) condition

  const handleRefetch = () => {
    setRefetch((prev) => !prev);
  };

  return (
    <>
      <div className="images-container">
        {!images && <p>Loading Images...</p>}
        {images && images.map((url, idx) => <Image key={idx} imgUrl={url} />)}
      </div>
      <button onClick={handleRefetch} className="refetch-button">
        Refetch Images
      </button>
    </>
  );
}

export default ImageContainer;
