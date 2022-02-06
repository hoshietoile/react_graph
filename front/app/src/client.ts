import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://192.168.33.10:3001/graphql',
  cache: new InMemoryCache(),
});