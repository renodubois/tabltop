import React, { useState } from "react";
import {
	Pressable,
	SafeAreaView,
	Text,
	TextInput,
	View,
	ScrollView,
} from "react-native";
import { BaseProps, Game, SearchableItem } from "../types";
import { useQuery } from "@apollo/react-hooks";
import { GameDataReturn } from "./GameSearchWrapper";
import { GET_GAMES } from "./GameSearchWrapper";
import { GET_USERS, UserDataReturn } from "./UserSearchWrapper";
import SearcherItem from "./SearcherItem";
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "./ErrorOverlay";
import Styles from "../styles";
import { findGame } from "./GameSearch";
import { findUser } from "./UserSearch";

interface Props extends BaseProps<"GeneralSearch"> {}

const GeneralSearch = ({ navigation }: Props) => {
	const [query, setQuery] = useState("");
	const [scopeBarVisible, setScopeBarVisible] = useState(false);
	const [scope, setScope] = useState<"games" | "users">("games");

	let queryLoading = true;
	let onItemSelect: (id: string) => void;
	let items: SearchableItem[] = [];
	let SearchResults = <LoadingOverlay />;
	if (scope === "games") {
		let { loading, error, data } = useQuery<GameDataReturn>(GET_GAMES, {
			variables: { query },
		});
		queryLoading = loading;
		onItemSelect = (id: string) =>
			navigation.navigate("GamePage", { gameID: id });
		if (error) {
			SearchResults = <ErrorOverlay error={error} />;
		} else if (!loading) {
			if ((data && data.searchGames.length === 0) || !data) {
				SearchResults = (
					<View style={{ alignSelf: "center", paddingTop: 30 }}>
						<Text style={Styles.searchFailureText}>
							No results found.
						</Text>
					</View>
				);
			} else {
				items = findGame(query, data.searchGames).map((game) => ({
					id: game.id,
					label: `${game.name} (${game.yearPublished})`,
					imageURL: game.thumbnailURL,
				}));
				SearchResults = (
					<ScrollView>
						{items.map((item) => (
							<SearcherItem
								hasToggle={false}
								{...item}
								key={item.id}
								onPress={(id) => onItemSelect(id)}
							/>
						))}
					</ScrollView>
				);
			}
		}
	} else if (scope === "users") {
		const { loading, error, data } = useQuery<UserDataReturn>(GET_USERS, {
			variables: { query },
		});
		queryLoading = loading;
		onItemSelect = (id: string) =>
			navigation.navigate("Profile", { userID: id });
		if (error) {
			SearchResults = <ErrorOverlay error={error} />;
		} else if (!loading) {
			if ((data && data.searchUsers.length === 0) || !data) {
				SearchResults = (
					<View style={{ alignSelf: "center", paddingTop: 30 }}>
						<Text style={Styles.searchFailureText}>
							No results found.
						</Text>
					</View>
				);
			} else {
				items = findUser(query, data.searchUsers).map((user) => ({
					id: user.id,
					label: user.username,
					imageURL: user.profilePictureURL,
				}));
				SearchResults = (
					<ScrollView>
						{items.map((item) => (
							<SearcherItem
								hasToggle={false}
								{...item}
								key={item.id}
								onPress={(id) => onItemSelect(id)}
							/>
						))}
					</ScrollView>
				);
			}
		}
	}

	return (
		<>
			<SafeAreaView style={{ backgroundColor: "#1c329c" }}>
				<TextInput
					autoCompleteType="off"
					autoCorrect={false}
					onChangeText={(newQuery) => setQuery(newQuery)}
					placeholder="Find games, users..."
					placeholderTextColor="white"
					onFocus={() => setScopeBarVisible(true)}
					returnKeyType="search"
					style={{ color: "white", padding: 20, fontSize: 16 }}
				/>
				{scopeBarVisible ? (
					<View
						style={{
							marginHorizontal: 20,
							marginBottom: 10,
							borderColor: "white",
							flexDirection: "row",
							borderWidth: 1,
							borderRadius: 12,
						}}
					>
						<Pressable
							onPress={() => setScope("games")}
							style={{
								flex: 1,
								paddingHorizontal: 10,
								paddingVertical: 5,
								alignItems: "center",
								borderRadius: 10,
								borderTopRightRadius: 0,
								borderBottomRightRadius: 0,
								backgroundColor:
									scope === "games" ? "white" : "#1c329c",
							}}
						>
							<Text
								style={{
									color:
										scope === "games" ? "#1c329c" : "white",
								}}
							>
								Games
							</Text>
						</Pressable>
						<Pressable
							onPress={() => setScope("users")}
							style={{
								flex: 1,
								paddingHorizontal: 10,
								paddingVertical: 5,
								alignItems: "center",
								borderRadius: 10,
								borderTopLeftRadius: 0,
								borderBottomLeftRadius: 0,
								backgroundColor:
									scope === "users" ? "white" : "#1c329c",
							}}
						>
							<Text
								style={{
									color:
										scope === "users" ? "#1c329c" : "white",
								}}
							>
								Users
							</Text>
						</Pressable>
					</View>
				) : null}
			</SafeAreaView>
			{SearchResults}
		</>
	);
};

export default GeneralSearch;
