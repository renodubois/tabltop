import React from "react";
import { storiesOf } from "@storybook/react-native";
import Post from "./Post";
import { View } from "react-native";

const games = [
	{
		name: "Wingspan",
		thumbnailURL:
			"https://cf.geekdo-images.com/thumb/img/wvfZwwtcqpth4bgHnh4M-EhUCXg=/fit-in/200x150/pic4458123.jpg"
	},
	{
		name: "Betrayal At House on the Hill",
		thumbnailURL:
			"https://cf.geekdo-images.com/itemrep/img/1EY_NICYM8BFSCaS6wa6BZOJs94=/fit-in/246x300/pic5146864.png"
	}
];

const props = {
	author: {
		username: "reno",
		profilePictureURL:
			"https://avatars0.githubusercontent.com/u/8910031?s=400&u=10b0121598ef09b8d6beeb897835bd940d0c2a4d&v=4"
	},
	taggedUsers: [{ username: "user1" }, { username: "user2" }],
	rating: 4.5,
	date: "6h",
	caption:
		"Really enjoyed this game. Felt better with 4 players, although it takes a bit longer. European Expansion is worth it!"
};

storiesOf("Post", module)
	.addDecorator((story: any) => (
		<View style={{ padding: 10, marginTop: 300 }}>{story()}</View>
	))
	.add("default", () => <Post {...props} game={games[0]} />)
	.add("Longer game name", () => <Post {...props} game={games[1]} />);
