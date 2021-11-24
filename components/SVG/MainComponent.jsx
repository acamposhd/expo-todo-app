import * as React from "react";
import Svg, { Path } from "react-native-svg";
import COLORS from "../../constants/colors";

export function SvgComponentBottom(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="50 0 150 100"
      style={{ position: "absolute", zIndex: -1 }}
    >
      <Path
        fill={COLORS.primary}
        fill-opacity="1"
        d="M0,96L40,122.7C80,149,160,203,240,197.3C320,192,400,128,480,96C560,64,640,64,720,101.3C800,139,880,213,960,240C1040,267,1120,245,1200,208C1280,171,1360,117,1400,90.7L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
      ></Path>
    </Svg>
  );
}
export function SvgComponentTop(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 150 1440 320"
      style={{ position: "absolute", zIndex: -1 }}
    >
      <Path
        fill={COLORS.primary}
        fill-opacity="1"
        d="M0,96L40,122.7C80,149,160,203,240,197.3C320,192,400,128,480,96C560,64,640,64,720,101.3C800,139,880,213,960,240C1040,267,1120,245,1200,208C1280,171,1360,117,1400,90.7L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
      ></Path>
    </Svg>
  );
}
