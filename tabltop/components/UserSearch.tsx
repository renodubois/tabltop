import React, { useState } from "react";
import { Image, Text, View, Button } from "react-native";
import { ListItem } from "react-native-elements";
import Autocomplete from "react-native-autocomplete-input";
import { TouchableOpacity } from "react-native-gesture-handler";
import Styles from "../styles";
import { User } from "../types";

interface Props {
	currentlyCheckedUsers: User[];
	users: User[];
	query: string;
	onSubmit: (checkedUsers: User[]) => void;
	onTextChange: (newQuery: string) => void;
}

const findUser = (query: string, users: User[]): User[] => {
	if (query === "") {
		return [];
	}

	const regex = new RegExp(`${query.trim()}`, "i");
	return users.filter((user) => user.username.search(regex) >= 0);
};

const UserSearch = ({
	currentlyCheckedUsers,
	users,
	query,
	onSubmit,
	onTextChange
}: Props): JSX.Element => {
	let searchData = findUser(query, users);
	const [checkedUsers, setCheckedUsers] = useState<User[]>(
		currentlyCheckedUsers
	);
	if (searchData.length < 1) {
		searchData = checkedUsers;
	}
	const handlePress = (item: User, namePosIfChecked: number): void => {
		const currentlyChecked = namePosIfChecked >= 0;
		if (currentlyChecked) {
			const updatedArray = Array.from(checkedUsers);
			updatedArray.splice(namePosIfChecked, 1);
			setCheckedUsers(updatedArray);
		} else {
			setCheckedUsers([...checkedUsers, item]);
		}
	};
	return (
		<View>
			<View style={{ alignSelf: "flex-end", padding: 10 }}>
				<Button
					title="Done"
					onPress={(): void => onSubmit(checkedUsers)}
				/>
			</View>
			<Autocomplete
				containerStyle={Styles.gameSearchContainer}
				autoFocus={true}
				defaultValue={query}
				data={searchData}
				placeholder="Find a user"
				placeholderTextColor="#353535"
				onChangeText={(text): void => onTextChange(text)}
				renderItem={(params): JSX.Element => {
					const { item, index } = params;
					const namePosIfChecked = checkedUsers.findIndex(
						(user) => user.username === item.username
					);
					const currentlyChecked = namePosIfChecked >= 0;
					// TODO: get a better profile picture placeholder
					const imageSource = item.profilePictureURL
						? {
								uri: item.profilePictureURL
						  }
						: require("../img/UserPlaceholder.png");
					return (
						<ListItem
							title={item.username}
							leftAvatar={{
								rounded: true,
								title: item.username,
								source: imageSource
							}}
							checkBox={{
								checked: currentlyChecked,
								checkedIcon: "check-circle-o",
								onIconPress: (): void =>
									handlePress(item, namePosIfChecked),
								uncheckedIcon: "circle-o",
								size: 28
							}}
							onPress={(): void =>
								handlePress(item, namePosIfChecked)
							}
						/>
					);
				}}
				style={Styles.gameSearchInput}
			/>
		</View>
	);
};

export default UserSearch;
