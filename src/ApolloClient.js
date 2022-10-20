import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {onError} from "apollo-link-error";
import {ApolloLink} from "apollo-link";
import {createUploadLink} from "apollo-upload-client";
import {getBaseUrl} from "./utils.js";



const httplink = new createUploadLink({
  uri: getBaseUrl()+"graphql",
  credentials: "same-origin",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `JWT ${
        localStorage.getItem("token") ? localStorage.getItem("token") : null
      }`,
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({graphQLErrors, networkError}) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({message, locations, path}) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authMiddleware,
    httplink,
  ]),
  cache: new InMemoryCache(),
});

export {client};
