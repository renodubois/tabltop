import React from "react";
import Profile from "./Profile";
import { User } from "../types";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "./ErrorOverlay";

interface Props {
	userID: string;
}
interface UserDataReturn {
	user: User;
}

export const GET_USER = gql`
	query GetUser($userID: String) {
		user(userID: $userID) {
			id
			username
			bio
			profilePictureURL
			followers {
				id
				username
				profilePictureURL
			}
		}
	}
`;

const ProfileWrapper = ({ userID }: Props) => {
	const { loading, error, data } = useQuery<UserDataReturn>(GET_USER, {
		variables: { userID }
	});
	if (loading) {
		return <LoadingOverlay />;
	}
	if (error) {
		return <ErrorOverlay error={error} />;
	}
	if (!data) {
		return <ErrorOverlay error="Couldn't find user" />;
	}
	return <Profile user={data.user} />;
};

export default ProfileWrapper;
