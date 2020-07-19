import React from "react";
import Profile from "./Profile";
import { User, Post, BaseProps } from "../types";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "./ErrorOverlay";

interface Props extends BaseProps<"Profile"> {
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
			followers {
				id
				username
				profilePictureURL
			}
		}
		postsByUser(userID: $userID) {
			id
			author {
				id
				username
				profilePictureURL
			}
			game {
				id
				name
				thumbnailURL
			}
			caption
			date
			rating
			taggedUsers {
				id
				username
				profilePictureURL
			}
		}
	}
`;

const ProfileWrapper = ({ route, navigation }: Props) => {
	const { loading, error, data } = useQuery<ProfileDataReturn>(
		GET_PROFILE_DATA,
		{
			variables: { userID: route.params.userID },
		}
	);
	if (loading) {
		return <LoadingOverlay />;
	}
	if (error) {
		return <ErrorOverlay error={error} />;
	}
	if (!data) {
		return <ErrorOverlay error="Couldn't fetch data for profile" />;
	}
	return (
		<Profile
			user={data.user}
			posts={data.postsByUser ? data.postsByUser : []}
			navigation={navigation}
			route={route}
		/>
	);
};

export default ProfileWrapper;
