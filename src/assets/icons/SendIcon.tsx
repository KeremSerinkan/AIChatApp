import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SendIcon = (props:SvgProps) => (
  <Svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M20 4L3 11L10 14M20 4L13 21L10 14M20 4L10 14"
      stroke="#000000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SendIcon;
