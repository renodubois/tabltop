import React from "react";
import Profile from "./Profile";
import { User, Post, BaseProps } from "../types";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "./ErrorOverlay";
import EditProfile from "./EditProfile";

interface Props extends BaseProps<"EditProfile"> {
	userID: string;
}
export interface ProfileDataReturn {
	user: User;
	postsByUser: Post[];
}

export const GET_PROFILE_DATA = gql`
	query GetProfileData($userID: String) {
		user(userID: $userID) {
			id
			username
			bio
			profilePictureURL
		}
	}
`;

const EditProfileWrapper = ({ route, navigation }: Props) => {
	// TODO: currently logged in user @tasksforauth
	const currentlyLoggedInUserID = "1";
	const { loading, error, data } = useQuery<ProfileDataReturn>(
		GET_PROFILE_DATA,
		{
			variables: { userID: currentlyLoggedInUserID },
		}
	);
	if (loading) {
		return <LoadingOverlay />;
	}
	if (error) {
		return <ErrorOverlay error={error} />;
	}
	if (!data || !data.user) {
		return <ErrorOverlay error="Couldn't fetch data for profile" />;
	}
	return (
		<EditProfile user={data.user} navigation={navigation} route={route} />
	);
};

export default EditProfileWrapper;
