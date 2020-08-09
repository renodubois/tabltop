import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { BaseProps } from "types";
import ErrorOverlay from "./ErrorOverlay";
import List from "./List";
import LoadingOverlay from "./LoadingOverlay";

interface Props extends BaseProps<"List"> {}

interface ListDataReturn {
	listByID: any;
}

const GET_LIST = gql`
	query GetListById($listID: string) {
		listByID(listID: $listID) {
			name
			contents {
				id
				name
			}
		}
	}
`;

const ListWrapper = ({ route }: Props) => {
	const { listID } = route.params;
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
	return <List contents={data.listByID.contents} name={data.listByID.name} />;
};

export default ListWrapper;
