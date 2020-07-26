import React from "react";
import { ScrollView, TextInput, View } from "react-native";
import { SearchableItem } from "../types";
import SearcherItem from "./SearcherItem";
import Styles from "../styles";

interface Props {
	defaultValue: string;
	items: SearchableItem[];
	onChangeText: (query: string) => void;
	onItemSelect: (id: string) => void;
	useToggles?: boolean;
}

const Searcher = ({
	defaultValue,
	items,
	onChangeText,
	onItemSelect,
	useToggles,
}: Props) => {
	return (
		<View>
			<TextInput
				autoCompleteType="off"
				autoCorrect={false}
				defaultValue={defaultValue}
				onChangeText={(newQuery) => onChangeText(newQuery)}
				placeholder="Find a game"
				returnKeyType="search"
				style={Styles.gameSearchInput}
			/>
			<ScrollView>
				{items.map((item) => (
					<SearcherItem
						hasToggle={!!useToggles}
						toggled={"toggled" in item ? item.toggled : false}
						{...item}
						key={item.id}
						onPress={(id) => onItemSelect(id)}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default Searcher;
