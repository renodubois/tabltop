import { StyleSheet } from "react-native";

export const commonStackNavigatorStyles = {
	headerBackTitle: "Back",
	headerStyle: {
		backgroundColor: "#1c329c",
	},
	headerTintColor: "#ffffff",
};

const Styles = StyleSheet.create({
	checkInOptionalItemWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		height: 80,
		marginLeft: 10,
		marginRight: 10,
		borderColor: "#7B8794",
		borderBottomWidth: 1,
		alignItems: "center",
	},
	checkInOptionalItemTopWrapper: {
		borderTopWidth: 1,
	},
	checkInOptionalItemText: {
		color: "#353535",
		fontSize: 18,
		textTransform: "uppercase",
		marginLeft: 10,
	},
	gameSearchContainer: {},
	gameSearchItemImage: {
		height: 80,
		width: 80,
		margin: 10,
		borderRadius: 5,
	},
	gameSearchInput: {
		padding: 20,
		borderRadius: 5,
		fontSize: 18,
		color: "#353535",
	},
	gameSearchItemText: {
		fontSize: 18,
		padding: 10,
	},
	gameSearchLabel: {
		padding: 10,
	},
	gameSearchLabelText: {
		textAlign: "center",
		fontSize: 18,
	},
	input: {
		backgroundColor: "white",
		width: "90%",
		padding: 20,
		marginTop: 10,
		marginLeft: 20,
		marginBottom: 20,
		borderRadius: 5,
		flexDirection: "row",
		shadowColor: "black",
		shadowOffset: { width: 5, height: 5 },
		shadowRadius: 3,
		shadowOpacity: 0.2,
	},
	inputDisabled: {
		backgroundColor: "#333333",
	},
	inputLabel: {
		marginLeft: 20,
		fontSize: 18,
		fontWeight: "bold",
	},
	inputMultiline: {
		marginTop: 30,
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 10,
		padding: 14,
		paddingTop: 14,
		fontSize: 18,
		backgroundColor: "#FFFFFF",
		height: 110,
		textAlignVertical: "top",
	},
	itemContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		// TODO: this applies to the last element in the search box, when it shouldn't
		borderBottomColor: "#c8ced7",
		borderBottomWidth: 1,
	},
	searchInput: {
		backgroundColor: "white",
		width: "90%",
		padding: 20,
		marginTop: 15,
		marginLeft: 20,
		marginBottom: 20,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "black",
		borderStyle: "solid",
		flexDirection: "row",
		shadowColor: "black",
		shadowOffset: { width: 5, height: 5 },
		shadowRadius: 3,
		shadowOpacity: 0.2,
	},
	searchInputText: {
		fontSize: 18,
		color: "#353535",
		marginLeft: 10,
		lineHeight: 24,
	},
	searchFailureText: {
		backgroundColor: "#CBD2D9",
		fontSize: 18,
	},
});

export default Styles;
