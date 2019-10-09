import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";

import client from "./src/apollo";
import AppContainer from "./src/screens/index";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <AppContainer />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}
