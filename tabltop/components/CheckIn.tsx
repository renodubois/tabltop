import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { Image, Text, View, Button } from "react-native";
import Slider from "@react-native-community/slider";
import Styles from "../styles";
import { Game } from "../types";
import CheckInGameSelector from "./CheckInGameSelector";
import {
    TextInput,
    TouchableOpacity,
    ScrollView
} from "react-native-gesture-handler";

interface GameDataReturn {
    games: Game[];
}
interface CheckInFormData {
    game?: Game;
    caption: string;
    rating: number;
}
const GET_GAMES = gql`
    {
        games {
            id
            name
            publisher
            yearPublished
            thumbnailURL
        }
    }
`;

const CheckIn = () => {
    const [formData, setFormData] = useState<CheckInFormData>({
        caption: "",
        rating: 1
    });
    const { loading, error, data } = useQuery<GameDataReturn>(GET_GAMES);
    if (!data) {
        // handle request failure
        return <Text>whoops</Text>;
    }
    const onGameSelect = (game: Game) => {
        setFormData({ ...formData, game });
    };
    if (!formData.game) {
        return (
            <>
                <View style={Styles.gameSearchLabel}>
                    <Text style={Styles.gameSearchLabelText}>
                        Search for a game:
                    </Text>
                </View>
                <CheckInGameSelector
                    games={data.games}
                    onGameSelect={onGameSelect}
                />
            </>
        );
    }
    // TODO: fix border radius when scrolling overflow gets enabled
    const caption = (
        <TextInput
            value={formData.caption}
            onChangeText={caption => setFormData({ ...formData, caption })}
            style={{
                marginTop: 30,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 10,
                padding: 14,
                paddingTop: 14,
                fontSize: 18,
                backgroundColor: "#FFFFFF",
                height: 110,
                textAlignVertical: "top"
            }}
            multiline
            numberOfLines={4}
            // autoFocus NOTE: re-enable this when not doing dev?
            placeholder="How was this game?"
        />
    );
    const rating = (
        <View
            style={{
                marginTop: 30,
                marginLeft: 15,
                marginRight: 25,
                width: "100%"
            }}
        >
            <Text style={{ fontSize: 14, color: "#353535", marginBottom: 25 }}>
                RATING
            </Text>
            <View
                style={{
                    flexDirection: "row"
                }}
            >
                <Slider
                    minimumValue={1}
                    maximumValue={5}
                    onValueChange={rating =>
                        setFormData({ ...formData, rating })
                    }
                    step={0.25}
                    style={{ flex: 2 }}
                    thumbTintColor="#0552B5"
                />
                <View
                    style={{
                        flexDirection: "row",
                        flex: 1,
                        paddingLeft: 45,
                        alignSelf: "center"
                    }}
                >
                    <Text
                        style={{
                            fontSize: 28,
                            fontWeight: "bold",
                            lineHeight: 35,
                            minWidth: 62,
                            textAlign: "right"
                        }}
                    >
                        {formData.rating}
                    </Text>
                    <Text style={{ fontSize: 18, lineHeight: 40 }}>/5.0</Text>
                </View>
            </View>
        </View>
    );
    const submitButton = (
        <View style={{ justifyContent: "flex-end" }}>
            <TouchableOpacity
                onPress={() => console.log("nice")}
                style={{
                    width: "100%",
                    backgroundColor: "#0967D2",
                    paddingTop: 22,
                    // TODO: this should be variable based on iPhone notches
                    paddingBottom: 36
                }}
            >
                <Text
                    style={{
                        width: "100%",
                        color: "#ffffff",
                        // TODO: add inset shadow
                        fontWeight: "bold",
                        fontSize: 24,
                        textAlign: "center",
                        letterSpacing: 2
                    }}
                >
                    CHECK IN
                </Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <>
            <ScrollView>
                <View
                    style={{
                        marginTop: 30,
                        marginLeft: 10,
                        marginRight: 10,
                        flexDirection: "row",
                        backgroundColor: "#E6F6FF",
                        borderRadius: 10,
                        overflow: "hidden"
                    }}
                >
                    <Image
                        source={{ uri: formData.game.thumbnailURL }}
                        style={{ width: 100, height: 100 }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: "bold",
                                    lineHeight: 48
                                }}
                            >
                                {formData.game.name}
                            </Text>
                            <Text
                                style={{
                                    paddingTop: 3,
                                    fontSize: 14,
                                    fontStyle: "italic",
                                    color: "#52606D",
                                    paddingLeft: 10,
                                    lineHeight: 48
                                }}
                            >
                                ({formData.game.yearPublished})
                            </Text>
                        </View>
                        <Text
                            style={{
                                fontSize: 18,
                                fontVariant: ["small-caps"],
                                color: "#3E4C59"
                            }}
                        >
                            {formData.game.publisher.toLowerCase()}
                        </Text>
                    </View>
                </View>
                {caption}
                {rating}
            </ScrollView>
            {submitButton}
        </>
    );
};

export default CheckIn;
