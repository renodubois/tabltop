import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigationParamsList } from "App";

export interface User {
	id: string;
	username: string;
	profilePictureURL: string;
	bio: string;
}

export interface Game {
	id: string;
	name: string;
	publisher: string;
	yearPublished: number;
	thumbnailURL: string;
	minPlayers: number;
	maxPlayers: number;
	categories: string[];
}

export interface Post {
	id: string;
	author: User;
	game: Game;
	caption: string;
	rating: string;
	taggedUsers: User[];
	location: string;
	images: string[];
}

export interface BaseProps<ScreenName extends keyof StackNavigationParamsList> {
	navigation: StackNavigationProp<StackNavigationParamsList, ScreenName>;
	route: RouteProp<StackNavigationParamsList, ScreenName>;
}

export interface CheckInFormData {
	game: Game;
	caption: string;
	rating: number;
	taggedUsers: User[];
}
export interface OptionalItemsFormData {
	taggedUsers: User[];
}
