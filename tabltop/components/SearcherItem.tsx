import React, { useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import Styles, { commonStackNavigatorStyles } from "../styles";

interface Props {
	hasToggle: boolean;
	label: string;
	id: string;
	imageURL: string;
	onPress: (id: string) => void;
	toggled?: boolean;
}

const SearcherItem = ({
	hasToggle,
	label,
	id,
	imageURL,
	onPress,
	toggled,
}: Props) => {
	return (
		<Pressable onPress={() => onPress(id)}>
			<View style={Styles.itemContainer}>
				<Image
					source={{ uri: imageURL }}
					style={Styles.gameSearchItemImage}
				/>
				<Text style={Styles.gameSearchItemText}>{label}</Text>
				{hasToggle && <Text>{toggled ? "✓" : "x"}</Text>}
			</View>
		</Pressable>
	);
};

export default SearcherItem;
