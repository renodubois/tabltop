import React, { useState } from "react";
import { Button, View } from "react-native";
import { User } from "../types";
import Searcher from "./Seacher";

interface Props {
	currentlyCheckedUsers: User[];
	users: User[];
	query: string;
	onSubmit: (checkedUsers: User[]) => void;
	onTextChange: (newQuery: string) => void;
}

export const findUser = (query: string, users: User[]): User[] => {
	// TODO: don't show currently logged in user @tasksforauth
	if (query === "") {
		return [];
	}

	const regex = new RegExp(`${query.trim()}`, "i");
	return users.filter(
		(user) => user.username.search(regex) >= 0 && user.username !== "reno"
	);
};

const UserSearch = ({
	currentlyCheckedUsers,
	users,
	query,
	onSubmit,
	onTextChange,
}: Props): JSX.Element => {
	let searchData = findUser(query, users);
	const [checkedUsers, setCheckedUsers] = useState<User[]>(
		currentlyCheckedUsers
	);
	if (searchData.length < 1) {
		searchData = checkedUsers;
	}
	const handlePress = (id: string): void => {
		const selectedUser = searchData.find((user) => user.id === id);
		if (!selectedUser) {
			console.error("Couldn't find user that was selected");
			return;
		}
		const namePosIfChecked = checkedUsers.findIndex(
			(user) => user.id === id
		);
		const currentlyChecked = namePosIfChecked >= 0;
		if (currentlyChecked) {
			const updatedArray = Array.from(checkedUsers);
			updatedArray.splice(namePosIfChecked, 1);
			setCheckedUsers(updatedArray);
		} else {
			setCheckedUsers([...checkedUsers, selectedUser]);
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
			<Searcher
				defaultValue={query}
				items={searchData.map((user) => {
					const namePosIfChecked = checkedUsers.findIndex(
						(checkedUser) => checkedUser.username === user.username
					);
					const currentlyChecked = namePosIfChecked >= 0;
					return {
						id: user.id,
						label: user.username,
						imageURL: user.profilePictureURL,
						toggled: currentlyChecked,
					};
				})}
				onChangeText={(newQuery) => onTextChange(newQuery)}
				onItemSelect={(id) => handlePress(id)}
			/>
		</View>
	);
};

export default UserSearch;
