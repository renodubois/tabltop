import React, { useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { BaseProps, Game } from "types";
import SearcherItem from "./SearcherItem";
import ListItem from "./ListItem";

interface Props extends BaseProps<"List"> {
	name: string;
	userIDs: string[];
	contents: Game[];
	onDelete: (id: string) => void;
}

const List = ({ contents, name, userIDs, navigation, onDelete }: Props) => {
	const [editing, setEditing] = useState<boolean>(false);
	return (
		<>
			<SafeAreaView
				style={{
					backgroundColor: "#1c329c",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 15,
					}}
				>
					<View style={{ flex: 1 }}>
						{navigation.canGoBack() ? (
							<Pressable onPress={() => navigation.goBack()}>
								<Text
									style={{
										color: "#ffffff",
										fontSize: 18,
									}}
								>
									Back
								</Text>
							</Pressable>
						) : null}
					</View>
					<View style={{ flex: 1, alignSelf: "center" }}>
						<Text
							style={{
								color: "#ffffff",
								fontSize: 18,
								fontWeight: "bold",
								textAlign: "center",
							}}
						>
							{name}
						</Text>
					</View>
					<View style={{ flex: 1 }}>
						{/* This should be shown only for your lists @tasksforauth */}
						{userIDs.includes("1") ? (
							<Pressable
								onPress={() => setEditing(!editing)}
								style={{ alignSelf: "flex-end" }}
							>
								<Text
									style={{
										color: "#ffffff",
										fontSize: 18,
									}}
								>
									{editing ? "Done" : "Edit"}
								</Text>
							</Pressable>
						) : null}
					</View>
				</View>
			</SafeAreaView>
			<View style={{ flex: 1 }}>
				<FlatList
					data={contents}
					renderItem={(listItem) => (
						<ListItem
							imageURL={listItem.item.thumbnailURL}
							id={listItem.item.id}
							label={listItem.item.name}
							key={listItem.item.id}
							onDelete={(id) => onDelete(id)}
							onPress={(id) =>
								navigation.push("GamePage", { gameID: id })
							}
							showDelete={editing}
						/>
					)}
					ItemSeparatorComponent={() => (
						<View
							style={{
								marginHorizontal: 10,
								borderTopWidth: 1,
								borderTopColor: "#999",
							}}
						/>
					)}
				/>
			</View>
		</>
	);
};

export default List;
