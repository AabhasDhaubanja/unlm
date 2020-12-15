// import { useMemo } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

let apolloClient;

function createApolloClient(token) {
  const httpLink = createUploadLink({
    uri: `${process.env.NEXT_PUBLIC_SERVER}/graphql`,
    credentials: "same-origin",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const link = onError(
    ({ graphQLErrors, networkError, response, operation }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );

      if (networkError) console.error(`[Network error]: ${networkError}`);

      if (response) response.errors = null;
    }
  );

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: link.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null, token) {
  const _apolloClient = apolloClient ?? createApolloClient(token);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState, token) {
  // const store = useMemo(() => initializeApollo(initialState), [initialState]);
  const store = initializeApollo(initialState, token);
  return store;
}
