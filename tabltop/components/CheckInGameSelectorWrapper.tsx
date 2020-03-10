import { useQuery } from "@apollo/react-hooks";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { gql } from "apollo-boost";
import { StackNavigationParamsList } from "App";
import React from "react";
import { View } from "react-native";
import { Game, BaseProps } from "types";
import CheckInGameSelector from "./CheckInGameSelector";
import ErrorOverlay from "./ErrorOverlay";
import LoadingOverlay from "./LoadingOverlay";

interface Props extends BaseProps<"Feed"> {}
interface GameDataReturn {
    games: Game[];
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

const CheckInGameSelectorWrapper = ({ navigation }: Props) => {
    const { loading, error, data } = useQuery<GameDataReturn>(GET_GAMES);
    if (loading) {
        return <LoadingOverlay />;
    }
    if (error) {
        return <ErrorOverlay error={error} />;
    }
    if (!data) {
        return <ErrorOverlay error={"No data found when querying games"} />;
    }
    return (
        <View style={{ backgroundColor: "white" }}>
            <CheckInGameSelector
                games={data.games}
                onGameSelect={(game: Game) =>
                    navigation.navigate("CheckIn", { game })
                }
            />
        </View>
    );
};

export default CheckInGameSelectorWrapper;
