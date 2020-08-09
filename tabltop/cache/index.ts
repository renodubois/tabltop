import { DataProxy } from "apollo-cache/lib";
import { GetPostsData, GET_POSTS } from "../components/Feed";
import {
	ProfileDataReturn,
	GET_PROFILE_DATA,
} from "../components/ProfileWrapper";
import { User, Post } from "../types";
import {
	GET_GAME_PAGE_DATA,
	GameDataReturn,
} from "../components/GamePageWrapper";

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
			postsByUser: [post, ...existingData.postsByUser],
			listsForUser: existingData.listsForUser,
		},
	});
};

const writePostToGamePageCache = (
	cache: any,
	gameID: string,
	post: Post,
	existingData: any
) => {
	cache.writeQuery({
		query: GET_GAME_PAGE_DATA,
		variables: { gameID: gameID },
		data: {
			gameByID: existingData.gameByID,
			postsByGame: [post, ...existingData.postsByGame],
		},
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
	// Add to Profile Cache
	try {
		const authorProfileFeedData = cache.readQuery<ProfileDataReturn>({
			query: GET_PROFILE_DATA,
			variables: { userID: newPost.author.id },
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
	// Add to tagged users, if any
	if (newPost.taggedUsers.length > 0) {
		newPost.taggedUsers.forEach((user: User) => {
			try {
				const userFeedData = cache.readQuery<ProfileDataReturn>({
					query: GET_PROFILE_DATA,
					variables: { userID: user.id },
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
	// Add to game cache
	try {
		const gamePageFeedData = cache.readQuery<GameDataReturn>({
			query: GET_GAME_PAGE_DATA,
			variables: { gameID: newPost.game.id },
		});
		if (gamePageFeedData) {
			writePostToGamePageCache(
				cache,
				newPost.game.id,
				newPost,
				gamePageFeedData
			);
		}
	} catch (e) {}

	cache.writeQuery({
		query: GET_POSTS,
		data: { posts: [newPost, ...data.posts] },
	});
	// Also need to update various other feeds where this exists, if applicable
};
