import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { SafeAreaView } from "react-native";
import { BaseProps, List as ListType } from "types";
import ErrorOverlay from "./ErrorOverlay";
import List from "./List";
import LoadingOverlay from "./LoadingOverlay";

interface Props extends BaseProps<"List"> {}

interface ListDataReturn {
	listByID: ListType;
}

const GET_LIST = gql`
	query GetListById($listID: String) {
		listByID(listID: $listID) {
			name
			contents {
				id
				name
				thumbnailURL
			}
			userIDs
		}
	}
`;

const REMOVE_GAME_FROM_LIST = gql`
	mutation RemoveGameFromList($gameID: ID!, $listID: ID!) {
		removeGameFromList(listEditInfo: { gameId: $gameID, listId: $listID }) {
			list {
				name
				contents {
					id
					name
					thumbnailURL
				}
				userIDs
			}
		}
	}
`;

const ListWrapper = ({ route, navigation }: Props) => {
	const { listID } = route.params;
	const [removeGameFromList, mutationData] = useMutation<
		{ removeGameFromList: { list: ListType } },
		{ gameID: string; listID: string }
	>(REMOVE_GAME_FROM_LIST, {
		update(cache, returnData) {
			const list = returnData.data?.removeGameFromList?.list;
			if (!list) {
				console.error(
					"Couldn't find the list object after deleteing item"
				);
			}
			cache.writeQuery({
				query: GET_LIST,
				variables: { listID },
				data: {
					listByID: list,
				},
			});
		},
	});
	const { loading, error, data } = useQuery<ListDataReturn>(GET_LIST, {
		variables: { listID: route.params.listID },
	});
	if (loading) {
		return <LoadingOverlay />;
	}
	if (error) {
		return <ErrorOverlay error={error} />;
	}
	if (!data || (data && !data.listByID)) {
		return <ErrorOverlay error="Couldn't fetch data for list" />;
	}
	return (
		<List
			contents={data.listByID.contents}
			name={data.listByID.name}
			userIDs={data.listByID.userIDs}
			navigation={navigation}
			route={route}
			onDelete={(id) =>
				removeGameFromList({ variables: { gameID: id, listID } })
			}
		/>
	);
};

export default ListWrapper;
