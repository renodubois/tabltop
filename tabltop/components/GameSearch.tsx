import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { TouchableOpacity } from "react-native-gesture-handler";
import Styles from "../styles";
import { Game } from "../types";

interface Props {
    games: Game[];
    onGameSelect: (game: Game) => void;
}

const findGame = (query: string, games: Game[]) => {
    if (query === "") {
        return [];
    }

    const regex = new RegExp(`${query.trim()}`, "i");
    return games.filter(game => game.name.search(regex) >= 0);
};

const GameSearch = ({ games, onGameSelect }: Props) => {
    const [query, setQuery] = useState<string>("");
    const searchData = findGame(query, games);
    return (
        <View>
            <Autocomplete
                containerStyle={Styles.gameSearchContainer}
                autoFocus={true}
                defaultValue={query}
                data={searchData}
                placeholder="Find a game"
                placeholderTextColor="#353535"
                onChangeText={text => setQuery(text)}
                renderItem={params => {
                    const { item, index } = params;
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onGameSelect(item)}
                        >
                            <View style={Styles.itemContainer}>
                                <Image
                                    source={{ uri: item.thumbnailURL }}
                                    style={Styles.gameSearchItemImage}
                                />
                                <Text style={Styles.gameSearchItemText}>
                                    {item.name} ({item.yearPublished})
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                style={Styles.gameSearchInput}
            />
        </View>
    );
};

export default GameSearch;
