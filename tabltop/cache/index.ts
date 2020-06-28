import { DataProxy } from "apollo-cache/lib";
import { GetPostsData, GET_POSTS } from "../components/Feed";
import {
	ProfileDataReturn,
	GET_PROFILE_DATA
} from "../components/ProfileWrapper";
import { User, Post } from "../types";

const writePostToProfileCache = (
	cache: any,
	userID: string,
	post: Post,
	existingData: any
) => {
	cache.writeQuery({
		query: GET_PROFILE_DATA,
		variables: { userID: userID },
		data: {
			user: existingData.user,
			postsByUser: [post, ...existingData.postsByUser]
		}
	});
};

export const updatePostCacheAfterPostInsert = (
	cache: DataProxy,
	newPost: Post
) => {
	const data = cache.readQuery<GetPostsData>({ query: GET_POSTS });
	if (!data) {
		console.error("NO POST DATA");
		return;
	}
	try {
		const authorProfileFeedData = cache.readQuery<ProfileDataReturn>({
			query: GET_PROFILE_DATA,
			variables: { userID: newPost.author.id }
		});
		if (authorProfileFeedData) {
			writePostToProfileCache(
				cache,
				newPost.author.id,
				newPost,
				authorProfileFeedData
			);
		}
	} catch (e) {}
	if (newPost.taggedUsers.length > 0) {
		newPost.taggedUsers.forEach((user: User) => {
			try {
				const userFeedData = cache.readQuery<ProfileDataReturn>({
					query: GET_PROFILE_DATA,
					variables: { userID: user.id }
				});
				if (userFeedData) {
					writePostToProfileCache(
						cache,
						user.id,
						newPost,
						userFeedData
					);
				}
			} catch (e) {}
		});
	}
	cache.writeQuery({
		query: GET_POSTS,
		data: { posts: [newPost, ...data.posts] }
	});
	// Also need to update various other feeds where this exists, if applicable
};
