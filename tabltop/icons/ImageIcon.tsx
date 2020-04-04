import React from "react";
import { Svg, Path } from "react-native-svg";
import { IconBaseProps } from "../icons";

interface ImageIconProps extends IconBaseProps {}

function ImageIcon({ color }: ImageIconProps) {
    return (
        <Svg
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <Path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </Svg>
    );
}

export default ImageIcon;
