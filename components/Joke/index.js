import useSWR from "swr";
import { useState } from "react";

export default function Joke() {
  const [funnyJokes, setFunnyJokes] = useState([]);
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
- this concept uses a simple list of joke IDs to track which jokes are marked as funny.
- the useState hook initializes funnyJokes as an empty array.
- the handleFunnyJokes function adds or removes a joke ID from this array.

Advantages 👍
Simplicity – The data structure is straightforward – just an array of IDs.
Ease of Checking – To find out if a joke is marked as funny, you only need to check if its ID is in the array.

Disadvantage 👎
Limited Data – ONLY joke IDs are stored. If you need more information about each joke (like a flag or a count),
this approach requires additional logic or a different data structure.

*/

  function handleFunnyJokes(id) {
    if (funnyJokes.includes(id)) {
      setFunnyJokes(funnyJokes.filter((joke) => joke !== id));
    } else {
      setFunnyJokes([...funnyJokes, id]);
    }
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>{joke.joke}</h1>
      <div>
        <button type="button" onClick={() => handleFunnyJokes(id)}>
          {funnyJokes.includes(id) ? "😂 is Funny" : "😐 is not Funny"}
        </button>
        <br />
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
