import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImagePicker, { Options } from "react-native-image-crop-picker";

const CheckInOptionalItems = ({}) => {
    const [images, setImages] = useState<any[]>([]);
    const imagePickerOptions: Options = {
        multiple: true,
        maxFiles: 4,
        includeBase64: true
    };
    const addImageButton = (
        <TouchableOpacity
            onPress={event =>
                ImagePicker.openPicker(imagePickerOptions).then(
                    value => {
                        if (Array.isArray(value)) {
                            const returnData = value.map(image => {
                                return {
                                    uri:
                                        `data:${image.mime};base64,` +
                                        image.data,
                                    width: image.width,
                                    height: image.height
                                };
                            });
                            setImages(returnData);
                        } else {
                            setImages([
                                {
                                    uri:
                                        `data:${value.mime};base64,` +
                                        value.data,
                                    width: value.width,
                                    height: value.height
                                }
                            ]);
                        }
                    },
                    reason =>
                        console.error("Rejected Image Picker open", reason)
                )
            }
        >
            <Text>Add Photos</Text>
        </TouchableOpacity>
    );
    return (
        <View>
            {addImageButton}
            {images
                ? images.map((image, i) => (
                      <Image
                          key={i}
                          source={{ uri: image.uri }}
                          style={{ height: 200, width: 200 }}
                      />
                  ))
                : null}
        </View>
    );
};

export default CheckInOptionalItems;
