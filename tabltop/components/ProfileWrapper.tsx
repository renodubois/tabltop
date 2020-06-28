import React from "react";
import Profile from "./Profile";
import { User, Post } from "../types";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "./ErrorOverlay";

interface Props {
	userID: string;
}
interface UserDataReturn {
	user: User;
	postsByUser: Post[];
}
interface FeedDataReturn {}

const GET_PROFILE_DATA = gql`
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
		postsByUser(userID: $userID) {
			id
			author {
				username
				profilePictureURL
			}
			game {
				name
				thumbnailURL
			}
			caption
			date
			rating
			taggedUsers {
				username
				profilePictureURL
			}
		}
	}
`;

const ProfileWrapper = ({ userID }: Props) => {
	const { loading, error, data } = useQuery<UserDataReturn>(
		GET_PROFILE_DATA,
		{
			variables: { userID }
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
	return <Profile user={data.user} posts={data.postsByUser} />;
};

export default ProfileWrapper;
