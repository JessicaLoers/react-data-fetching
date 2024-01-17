import { useState } from "react";
import useSWR from "swr";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Joke() {
  const [id, setId] = useState(0);

  const {
    data: joke,
    isLoading,
    error,
  } = useSWR(`https://example-apis.vercel.app/api/bad-jokes/${id}`);

  if (error) {
    return <h1>failed to load: {error.message}</h1>;
  }

  if (isLoading) {
    return <h1> 🤡 Loading...</h1>;
  }

  console.log(joke);

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
