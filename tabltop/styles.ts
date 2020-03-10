import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 5
    },
    gameSearchLabel: {
        padding: 10
    },
    gameSearchLabelText: {
        textAlign: "center",
        fontSize: 18
    },
    searchInput: {
        width: "100%",
        textAlign: "center",
        padding: 20
    },
    searchInputText: {
        fontWeight: "bold"
    }
});

export default Styles;
