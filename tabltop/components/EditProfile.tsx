import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState } from "react";
import {
	Image,
	PlatformColor,
	Pressable,
	Text,
	TextInput,
	View,
} from "react-native";
import Styles from "../styles";
import { BaseProps, User } from "../types";
import { onAddImagePress } from "../util/image_picker";

interface Props extends BaseProps<"EditProfile"> {
	user: User;
}
interface EditProfileFormData {
	bio?: string;
	photo?: string;
}

const EDIT_PROFILE = gql`
	mutation EditProfile($profileInfo: EditProfileInput) {
		editProfile(profileInfo: $profileInfo) {
			user {
				id
				username
				bio
				profilePictureURL
				followers {
					id
					username
					profilePictureURL
				}
			}
		}
	}
`;

const EditProfile = ({ navigation, user }: Props) => {
	const [formData, setFormData] = useState<EditProfileFormData>({
		bio: user.bio,
		photo: user.profilePictureURL,
	});

	const [editProfile] = useMutation(EDIT_PROFILE);
	return (
		<View style={{ paddingTop: 40 }}>
			<View>
				<Text style={Styles.inputLabel}>Profile Picture</Text>
				{/* TODO: check for a11y requirements here */}
				<View style={{ padding: 20 }}>
					<Pressable
						onPress={async () => {
							onAddImagePress((image) =>
								setFormData({ ...formData, photo: image.path })
							);
						}}
					>
						<Image
							source={{ uri: formData.photo }}
							style={{
								width: 150,
								height: 150,
								borderRadius: 100,
								alignSelf: "center",
							}}
						/>
					</Pressable>
				</View>
			</View>
			<View>
				<Text style={Styles.inputLabel}>Your Bio</Text>
				<TextInput
					onChangeText={(bio): void =>
						setFormData({ ...formData, bio })
					}
					editable
					value={formData.bio}
					style={{ ...Styles.inputMultiline, marginTop: 10 }}
					multiline
					numberOfLines={3}
				/>
			</View>
			<View style={{ alignSelf: "center", padding: 20 }}>
				<Pressable
					onPress={() => {
						editProfile({
							variables: {
								profileInfo: {
									...formData,
									userId: user.id,
								},
							},
						});
						navigation.goBack();
					}}
				>
					<Text
						style={{
							color: PlatformColor("linkColor"),
							fontSize: 20,
						}}
					>
						Save Changes
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default EditProfile;
