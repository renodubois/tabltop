import React from "react";
import renderer, { act } from "react-test-renderer";
import { MockedProvider, wait } from "@apollo/react-testing";
import Feed, { GET_POSTS } from "../components/Feed";

it("renders correctly", () => {
	const mocks = [
		{
			request: {
				query: GET_POSTS
			},
			response: () => {
				return {
					data: {
						posts: [
							{
								id: "1",
								author: {
									id: "1",
									username: "reno",
									bio: "tabltop dev person"
								},
								game: {},
								caption: "A test post!",
								location: "My House"
							},
							{
								id: "2",
								author: {},
								game: {},
								caption: "Yet another great game of Wingspan",
								location: "My House"
							}
						]
					}
				};
			}
		}
	];
	renderer.create(
		<MockedProvider mocks={mocks} addTypename={false}>
			<Feed />
		</MockedProvider>
	);
});
