import { FlatList, View, Text } from "react-native";
import { Game } from "types";
import React from "react";

interface Props {
	name: string;
	contents: Game[];
}

const List = ({ contents, name }: Props) => {
	return (
		<View>
			<Text>{name}</Text>
			<FlatList
				data={contents}
				renderItem={(listItem) => (
					<View key={listItem.item.id}>
						<Text>{listItem.item.name}</Text>
					</View>
				)}
			/>
		</View>
	);
};

export default List;
