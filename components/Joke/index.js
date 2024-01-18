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

  /* Marking jokes as favorites (or "funny" in this context)
- this concept uses a uses an array of joke objects, each with an "id" and an "isFunny" property.
- the useState hook here would initialize jokesInfo as an array of these objects.
- handleToggleFunny updates the isFunny property of a joke, or adds a new joke object if it doesn't exist.

Advantages 👍
Rich Data Structure – since each joke is an object, it's easy to store and manage additional properties about each joke.
More suited for complex operations or when you need to handle more data for each joke.

Disadvantage 👎
Complexity – the logic for updating jokes is more complex compared to a simple ID list (see branch demo/fechted-data-with-local-state_2 )
Performance Considerations: Mapping over the entire array to update a single joke can be less efficient, especially with a large number of jokes.
*/

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
