import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";

export const initApolloClient = (): ApolloClient<NormalizedCacheObject> => {
	return new ApolloClient({
		link: ApolloLink.from([
			onError(({ graphQLErrors, networkError }) => {
				if (graphQLErrors)
					graphQLErrors.forEach(({ message, locations, path }) =>
						console.log(
							`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
						)
					);
				if (networkError)
					console.log(`[Network error]: ${networkError}`);
			}),
			new HttpLink({
				uri: "http://localhost:4000"
			})
		]),
		cache: new InMemoryCache()
	});
};
