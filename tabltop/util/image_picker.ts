import { ActionSheetIOS } from "react-native";
import ImagePicker, {
	Image as ImageObject,
	Options,
} from "react-native-image-crop-picker";

const USER_CANCELLED_IMAGE_SELECTION_MESSAGE = "User cancelled image selection";

const imagePickerOptions: Options = {
	cropping: true,
	multiple: false,
};
enum addPhotoActionSheetResults {
	CANCEL_ACTION,
	TAKE_PHOTO,
	CHOOSE_PHOTOS,
}

// TODO: convert to async/await
const openPhotoPicker = async (onPhotoLoad: (image: ImageObject) => void) => {
	try {
		const image = await ImagePicker.openPicker(imagePickerOptions);
		if (Array.isArray(image)) {
			return;
		}
		onPhotoLoad(image);
	} catch (reason) {
		if (reason.message === USER_CANCELLED_IMAGE_SELECTION_MESSAGE) {
			return;
		} else {
			console.error(reason);
		}
	}
};

const openCamera = async (onPhotoLoad: (image: ImageObject) => void) => {
	try {
		const image = await ImagePicker.openCamera(imagePickerOptions);
		if (Array.isArray(image)) {
			return;
		}
		onPhotoLoad(image);
	} catch (reason) {
		// TODO: update this when able to test on real device
		console.error(reason);
	}
};

export const onAddImagePress = (onPhotoLoad: (image: ImageObject) => void) => {
	ActionSheetIOS.showActionSheetWithOptions(
		{
			options: ["Cancel", "Take Photo...", "Choose from Library..."],
			cancelButtonIndex: 0,
		},
		(buttonIndex) => {
			switch (buttonIndex) {
				case addPhotoActionSheetResults.CANCEL_ACTION:
					return;
				case addPhotoActionSheetResults.CHOOSE_PHOTOS:
					openPhotoPicker(onPhotoLoad);
					break;
				case addPhotoActionSheetResults.TAKE_PHOTO:
					// TODO: Test this when I can put app on an actual device
					openCamera(onPhotoLoad);
					break;
			}
		}
	);
};
