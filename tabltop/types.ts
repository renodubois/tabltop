import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type StackNavigationParamsList = {
	Feed: undefined;
	CheckIn: { game: Game; userID: string };
	Profile: { userID: string };
	EditProfile: undefined;
	GameSearch: undefined;
	GamePage: { gameID: string };
	GeneralSearch: undefined;
	List: { listID: string };
};

export interface User {
	id: string;
	username: string;
	profilePictureURL: string;
	bio: string;
	followers?: User[];
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
	averageRating: string;
}

export interface Post {
	id: string;
	author: User;
	game: Game;
	caption: string;
	rating: string;
	date: string;
	taggedUsers: User[];
	location: string;
	images: string[];
}

export interface List {
	id: string;
	name: string;
	contents: Game[];
	public: boolean;
	editable: boolean;
	userIDs: string[];
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

export interface SearchableItem {
	label: string;
	id: string;
	imageURL: string;
	toggled?: boolean;
}
