/**
 * @format
 */

import React from "react";
import renderer, { act } from "react-test-renderer";
import GameSearchWrapper, { GET_GAMES } from "../components/GameSearchWrapper";
import { MockedProvider, wait } from "@apollo/react-testing";

const navigation = { navigate: jest.fn() };
const apolloMocks = [
	{
		request: {
			query: GET_GAMES,
			variables: {
				query: ""
			}
		},
		result: () => {
			return {
				data: {
					searchGames: [
						{
							id: "266192",
							name: "Wingspan",
							publisher: "Stonemaier Games",
							yearPublished: 2019,
							thumbnailURL:
								"https://cf.geekdo-images.com/thumb/img/wvfZwwtcqpth4bgHnh4M-EhUCXg=/fit-in/200x150/pic4458123.jpg"
						}
					]
				}
			};
		}
	}
];

it("renders correctly", async () => {
	act(() => {
		renderer.create(
			<MockedProvider mocks={apolloMocks} addTypename={false}>
				<GameSearchWrapper />
			</MockedProvider>
		);
	});

	await wait(3000);
});
