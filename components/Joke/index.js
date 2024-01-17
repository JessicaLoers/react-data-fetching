import useSWR from "swr";
import { useState } from "react";

export default function Joke() {
  const [jokesInfo, setJokesInfo] = useState([]);
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

  function handleToggleFunny(id) {
    setJokesInfo((prevJokes) => {
      const foundJoke = prevJokes.find((joke) => joke.id === id);

      if (foundJoke) {
        return prevJokes.map((joke) =>
          joke.id === id ? { ...joke, isFunny: !joke.isFunny } : joke
        );
      }

      return [...prevJokes, { id, isFunny: true }];
    });
  }

  const { isFunny } = jokesInfo.find((info) => info.id === id) ?? {
    isFunny: false,
  };

  return (
    <>
      <small>ID: {id}</small>
      <h1>{joke.joke}</h1>
      <div>
        <button type="button" onClick={() => handleToggleFunny(id)}>
          {isFunny ? "stop laughing" : "start laughing"}
        </button>
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
