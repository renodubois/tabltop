import { Modal, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import Styles from "../styles";

interface Props {
    onDismiss: () => any;
    onSubmit: () => any;
    visible: boolean;
}

const SearchModal = ({ visible, onSubmit, onDismiss }: Props) => {
    return (
        <Modal transparent visible={visible}>
            <View
                style={{
                    height: "60%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)"
                }}
            >
                <TouchableOpacity onPress={() => onDismiss()}>
                    <View style={{ width: "100%", height: "100%" }} />
                </TouchableOpacity>
            </View>
            <View>
                {/* 
                            We need something that look like an input box here, 
                            but actually just navigates to a differnt screen.
                            */}
                <TouchableOpacity onPress={() => onSubmit()}>
                    <View style={Styles.searchInput}>
                        <Text style={Styles.searchInputText}>Find a game</Text>
                    </View>
                </TouchableOpacity>
                {/* TODO: add recent/recommended games here */}
                <Text>Search for a game above</Text>
            </View>
        </Modal>
    );
};

export default SearchModal;
