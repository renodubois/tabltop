import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { User } from "types";
import Styles from "../styles";
import ErrorOverlay from "./ErrorOverlay";
import LoadingOverlay from "./LoadingOverlay";
import UserSearch from "./UserSearch";
import UserSearchNew from "./UserSearchNew";

interface Props {
	onUserSelect: (user: User) => void;
}
interface UserDataReturn {
	searchUsers: User[];
}
export const GET_USERS = gql`
	query GetUsers($query: String) {
		searchUsers(query: $query) {
			id
			username
			profilePictureURL
		}
	}
`;

const UserSearchWrapper = ({ onUserSelect }: Props): JSX.Element => {
	const [query, setQuery] = useState<string>("");
	const { loading, error, data } = useQuery<UserDataReturn>(GET_USERS, {
		variables: { query }
	});
	let ResultsError: React.ReactNode | null = null;
	if (error) {
		return <ErrorOverlay error={error} />;
	}
	if (!loading) {
		if ((data && data.searchUsers.length === 0) || !data) {
			ResultsError = (
				<View style={{ alignSelf: "center", paddingTop: 30 }}>
					<Text style={Styles.searchFailureText}>
						No results found.
					</Text>
				</View>
			);
		}
	}
	return (
		<>
			<View style={{ backgroundColor: "white" }}>
				<UserSearchNew
					users={data && data.searchUsers ? data.searchUsers : []}
					query={query}
					onUserSelect={(user: User): void => onUserSelect(user)}
					onTextChange={(newQuery: string): void =>
						setQuery(newQuery)
					}
				/>
			</View>
			{loading ? <LoadingOverlay /> : null}
			{ResultsError}
		</>
	);
};

export default UserSearchWrapper;
