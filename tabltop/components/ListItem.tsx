import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Styles from "../styles";

interface Props {
	label: string;
	id: string;
	imageURL: string;
	onDelete: (id: string) => void;
	onPress: (id: string) => void;
	showDelete: boolean;
}

const ListItem = ({
	label,
	id,
	imageURL,
	onDelete,
	onPress,
	showDelete,
}: Props) => {
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	if (!showDelete && showDeleteConfirmation) {
		setShowDeleteConfirmation(false);
	}
	return (
		<Pressable onPress={() => onPress(id)}>
			<View style={Styles.itemContainer}>
				{showDelete && (
					<Pressable
						style={{
							width: 10,
							padding: 2,
							marginLeft: 5,
							borderRadius: 50,
							backgroundColor: "red",
						}}
						onPress={() => setShowDeleteConfirmation(true)}
					>
						<Text
							style={{
								color: "white",
								fontWeight: "bold",
							}}
						>
							-
						</Text>
					</Pressable>
				)}
				<Image
					source={{ uri: imageURL }}
					style={Styles.gameSearchItemImage}
				/>
				<Text style={{ ...Styles.gameSearchItemText, flex: 1 }}>
					{label}
				</Text>
				{showDelete && showDeleteConfirmation && (
					<Pressable
						style={{
							backgroundColor: "red",
							alignSelf: "stretch",
							justifyContent: "center",
							paddingHorizontal: 10,
						}}
						onPress={() => {
							onDelete(id);
							setShowDeleteConfirmation(false);
						}}
					>
						<Text style={{ color: "white" }}>Delete</Text>
					</Pressable>
				)}
			</View>
		</Pressable>
	);
};

export default ListItem;
