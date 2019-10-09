import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, split, concat } from "apollo-link";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { WebSocketLink } from "apollo-link-ws";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "apollo-utilities";

const cache = new InMemoryCache();

const httpLink = new createHttpLink({
  uri: "http://54.180.104.238:4000/graphql"
});

const wsLink = new WebSocketLink({
  uri: "ws://54.180.104.238:4000/subscriptions",
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "X-JWT":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTcwMzU2NzI1fQ.vJTaEO06jeWIW7YdOyHp_g7bUE8_4egEPXA7Q9iLmBM"
      }
    }
  }
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-JWT":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTcwMzU2NzI1fQ.vJTaEO06jeWIW7YdOyHp_g7bUE8_4egEPXA7Q9iLmBM"
    }
  };
});

const combinedLinks = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: cache,
  link: ApolloLink.from([concat(authLink, combinedLinks), createUploadLink()])
});

export default client;
