// Importing SWRConfig from SWR, which is used to set global configurations for SWR in your application.
import { SWRConfig } from "swr";
import GlobalStyle from "../styles";

// Defining the "fetcher" function, which is used by SWR to know how to fetch data
// It's using the browser's "fetch" API to make a network request, then parsing the response as JSON
const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      {/* SWRConfig component from SWR library is used here to set global configurations.
          - "value" prop receives an object with configuration options and the "fetcher" function from above is passed.
          - ➡️ This means that every use of SWR in this application will use this "fetcher" function
            by default to make network requests. */}
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
