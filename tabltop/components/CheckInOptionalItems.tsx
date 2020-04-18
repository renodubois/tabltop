import React, { useState } from "react";
import { ActionSheetIOS, ImageBackground, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImagePicker, {
	Image as ImageObject,
	Options
} from "react-native-image-crop-picker";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import CircleDeleteIcon from "../icons/CircleDeleteIcon";
import ImageIcon from "../icons/ImageIcon";
import Styles from "../styles";

interface FormattedImageObject {
	id: number;
	uri: string;
	width: number;
	height: number;
}
enum addPhotoActionSheetResults {
	CANCEL_ACTION,
	TAKE_PHOTO,
	CHOOSE_PHOTOS
}
const imagePickerOptions: Options = {
	multiple: true,
	maxFiles: 4,
	includeBase64: true
};
const USER_CANCELLED_IMAGE_SELECTION_MESSAGE = "User cancelled image selection";

const handleImages = (
	value: ImageObject | ImageObject[]
): FormattedImageObject[] => {
	if (Array.isArray(value)) {
		const formattedImageObjects = value.map(image => {
			return {
				id: Math.random() * 100,
				uri: `data:${image.mime};base64,` + image.data,
				width: image.width,
				height: image.height
			};
		});
		return formattedImageObjects;
	} else {
		return [
			{
				id: Math.random() * 100,
				uri: `data:${value.mime};base64,` + value.data,
				width: value.width,
				height: value.height
			}
		];
	}
};

const CheckInOptionalItems = (): JSX.Element => {
	const [images, setImages] = useState<FormattedImageObject[]>([]);

	const openPhotoPicker = (): void => {
		ImagePicker.openPicker(imagePickerOptions).then(
			value => setImages(handleImages(value)),
			reason => {
				if (reason.message === USER_CANCELLED_IMAGE_SELECTION_MESSAGE) {
					return;
				} else {
					console.error(reason);
				}
			}
		);
	};

	const openCamera = (): void => {
		ImagePicker.openCamera(imagePickerOptions).then(
			value => setImages(handleImages(value)),
			reason => {
				// TODO: update this when able to test on real device
				console.error(reason);
			}
		);
	};

	const onAddImagePress = (): void => {
		ActionSheetIOS.showActionSheetWithOptions(
			{
				options: ["Cancel", "Take Photo...", "Choose from Library..."],
				cancelButtonIndex: 0
			},
			buttonIndex => {
				switch (buttonIndex) {
					case addPhotoActionSheetResults.CANCEL_ACTION:
						return;
					case addPhotoActionSheetResults.CHOOSE_PHOTOS:
						openPhotoPicker();
						break;
					case addPhotoActionSheetResults.TAKE_PHOTO:
						// TODO: Test this when I can put app on an actual device
						openCamera();
						break;
				}
			}
		);
	};
	// const onAddLocationPress = (): void => {
	// 	console.error("Not Implemented Yet");
	// };
	// const onAddFriendsPress = (): void => {
	// 	console.error("Not Implemented Yet");
	// };
	// const removeImage = (): void => {
	// 	console.error("Not Implemented Yet");
	// };

	const renderImage = (
		image: FormattedImageObject,
		index: number
	): JSX.Element => {
		return (
			<ImageBackground
				key={image.id}
				source={{ uri: image.uri }}
				style={{
					height: 80,
					width: 80,
					margin: 10,
					borderRadius: 5
				}}
			>
				<TouchableOpacity
					onPress={(): void => {
						const oldImages = [...images];
						oldImages.splice(index, 1);
						setImages(oldImages);
					}}
					style={{
						height: 25,
						width: 25,
						marginLeft: 54
					}}
				>
					<CircleDeleteIcon color="#000000" opacity={0.7} />
				</TouchableOpacity>
			</ImageBackground>
		);
	};

	const addImageButton = (
		<TouchableOpacity onPress={(): void => onAddImagePress()}>
			<View
				style={[
					Styles.checkInOptionalItemWrapper,
					Styles.checkInOptionalItemTopWrapper
				]}
			>
				<View style={{ height: 40, width: 40 }}>
					<ImageIcon color="#52606D" />
				</View>
				<View style={{ flex: 1 }}>
					<Text style={Styles.checkInOptionalItemText}>
						Add Photos
					</Text>
				</View>
				<View style={{ height: 60, width: 40 }}>
					<ArrowRightIcon color="#52606D" />
				</View>
			</View>
		</TouchableOpacity>
	);
	// const addLocationButton = (
	// 	<TouchableOpacity onPress={_ => onAddLocationPress()}>
	// 		<View style={Styles.checkInOptionalItemWrapper}>
	// 			<View style={{ height: 40, width: 40 }}>
	// 				<ImageIcon color="#52606D" />
	// 			</View>
	// 			<View style={{ flex: 1 }}>
	// 				<Text style={Styles.checkInOptionalItemText}>
	// 					Add Location
	// 				</Text>
	// 			</View>
	// 			<View style={{ height: 60, width: 40 }}>
	// 				<ArrowRightIcon color="#52606D" />
	// 			</View>
	// 		</View>
	// 	</TouchableOpacity>
	// );
	// const addFriendsButton = (
	// 	<TouchableOpacity onPress={_ => onAddFriendsPress()}>
	// 		<View style={Styles.checkInOptionalItemWrapper}>
	// 			<View style={{ height: 40, width: 40 }}>
	// 				<ImageIcon color="#52606D" />
	// 			</View>
	// 			<View style={{ flex: 1 }}>
	// 				<Text style={Styles.checkInOptionalItemText}>
	// 					Tag Friends
	// 				</Text>
	// 			</View>
	// 			<View style={{ height: 60, width: 40 }}>
	// 				<ArrowRightIcon color="#52606D" />
	// 			</View>
	// 		</View>
	// 	</TouchableOpacity>
	// );
	return (
		<View>
			<View style={{ marginTop: 20 }}>
				{images.length > 0 ? (
					<View style={{ flexDirection: "row" }}>
						{images
							? images.map((image, i) => renderImage(image, i))
							: null}
					</View>
				) : (
					addImageButton
				)}
			</View>
		</View>
	);
};

export default CheckInOptionalItems;
