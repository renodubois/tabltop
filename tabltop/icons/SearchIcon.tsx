import React from "react";
import { Svg, Path } from "react-native-svg";
import { IconBaseProps } from "../icons";

type SearchIconProps = IconBaseProps;

const SearchIcon = ({ color }: SearchIconProps): JSX.Element => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<Path
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default SearchIcon;
