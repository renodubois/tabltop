import React, { useState } from "react";
import { Modal, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import UserGroupIcon from "../icons/UserGroupIcon";
import Styles from "../styles";
import { BaseProps, OptionalItemsFormData } from "../types";
import UserSearchWrapper from "./UserSearchWrapper";

interface Props extends BaseProps<"CheckIn"> {
	onFormDataChange: (formData: OptionalItemsFormData) => void;
}

interface FormattedImageObject {
	id: number;
	uri: string;
	width: number;
	height: number;
}

const CheckInOptionalItems = ({
	navigation,
	route,
	onFormDataChange
}: Props): JSX.Element => {
	const [formData, setFormData] = useState<OptionalItemsFormData>({
		taggedUsers: []
	});
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
						checkedUsers={formData.taggedUsers}
						onSubmit={(checkedUsers): void => {
							const newFormData = {
								...formData,
								taggedUsers: checkedUsers
							};
							setFormData(newFormData);
							onFormDataChange(newFormData);
							setShowUserSearch(false);
						}}
					/>
				</View>
			</Modal>
			<View>
				{formData.taggedUsers.map((user, i) => (
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
