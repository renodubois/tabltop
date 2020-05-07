import React, { useState } from "react";
import { Text, View, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import UserGroupIcon from "../icons/UserGroupIcon";
import Styles from "../styles";
import { BaseProps, User } from "../types";
import UserSearchWrapper from "./UserSearchWrapper";

type Props = BaseProps<"CheckIn">;

interface FormattedImageObject {
	id: number;
	uri: string;
	width: number;
	height: number;
}

const CheckInOptionalItems = ({ navigation, route }: Props): JSX.Element => {
	const [taggedFriends, setTaggedFriends] = useState<User[]>([]);
	const [showUserSearch, setShowUserSearch] = useState(false);

	const addFriendsButton = (
		<TouchableOpacity onPress={(): void => setShowUserSearch(true)}>
			<View
				style={[
					Styles.checkInOptionalItemWrapper,
					Styles.checkInOptionalItemTopWrapper
				]}
			>
				<View style={{ height: 40, width: 40 }}>
					<UserGroupIcon color="#52606D" />
				</View>
				<View style={{ flex: 1 }}>
					<Text style={Styles.checkInOptionalItemText}>
						Tag Friends
					</Text>
				</View>
				<View style={{ height: 60, width: 40 }}>
					<ArrowRightIcon color="#52606D" />
				</View>
			</View>
		</TouchableOpacity>
	);
	return (
		<>
			<Modal visible={showUserSearch}>
				<View
					style={{
						height: "40%",
						backgroundColor: "rgba(0, 0, 0, 0.6)"
					}}
				>
					<TouchableOpacity
						onPress={(): void => setShowUserSearch(false)}
					>
						<View style={{ width: "100%", height: "100%" }} />
					</TouchableOpacity>
				</View>
				<View style={{ backgroundColor: "white" }}>
					<UserSearchWrapper
						checkedUsers={taggedFriends}
						onSubmit={(checkedUsers): void => {
							setTaggedFriends(checkedUsers);
							setShowUserSearch(false);
						}}
					/>
				</View>
			</Modal>
			<View>
				{taggedFriends.map((user, i) => (
					<View key={i}>
						<Text>{user.username}</Text>
					</View>
				))}
				<View style={{ marginTop: 20 }}>{addFriendsButton}</View>
			</View>
		</>
	);
};

export default CheckInOptionalItems;
