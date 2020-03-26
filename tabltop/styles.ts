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
        shadowOpacity: 0.2
    },
    searchInputText: {
        fontSize: 18,
        color: "#353535",
        marginLeft: 10,
        lineHeight: 24
    }
});

export default Styles;
