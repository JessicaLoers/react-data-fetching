// Importing SWRConfig from SWR, which is used to set global configurations for SWR in your application
import useSWR from "swr";
import { useState } from "react";

export default function Joke() {
  const [id, setId] = useState(0);

  // Using the useSWR hook to fetch data
  // The URL depends on the current "id", so a new joke is fetched every time "id" changes
  // The hook returns an object containing the fetched data, loading state and error state
  const {
    data: joke, // "data" is being renamed to "joke" for clarity
    isLoading, // boolean to indicate if the request is still loading
    error, // object containing error information if the request fails
  } = useSWR(`https://example-apis.vercel.app/api/bad-jokes/${id}`);

  // If there's an error in fetching data, display an error message
  if (error) {
    return <h1>failed to load: {error.message}</h1>;
  }
  // If data is still loading, display a loading message.
  if (isLoading) {
    return <h1> 🤡 Loading...</h1>;
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>{joke.joke}</h1>
      <div>
        <button type="button" onClick={() => setId(joke.prevId)}>
          ← Prev Joke
        </button>
        <button type="button" onClick={() => setId(joke.nextId)}>
          Next Joke →
        </button>
      </div>
    </>
  );
}
