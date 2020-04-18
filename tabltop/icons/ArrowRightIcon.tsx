import React from "react";
import { Svg, Path } from "react-native-svg";
import { IconBaseProps } from "../icons";

interface ArrowRightIconProps extends IconBaseProps {
	color: string;
}

const ArrowRightIcon = ({ color }: ArrowRightIconProps): JSX.Element => {
	return (
		<Svg viewBox="0 0 100 100" fill="none">
			<Path
				d="M9 5l7 7-7 7"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
				scaleX={4}
				scaleY={4}
			/>
		</Svg>
	);
};

export default ArrowRightIcon;
