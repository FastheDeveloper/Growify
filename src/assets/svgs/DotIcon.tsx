import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#666"
      d="M2 4.398c-.344 0-.658-.084-.942-.252a1.959 1.959 0 0 1-.682-.682 1.819 1.819 0 0 1-.251-.941c0-.347.084-.66.251-.942.17-.284.398-.51.682-.678.284-.17.598-.255.942-.255.347 0 .66.085.942.255.284.168.51.394.677.678.17.281.256.595.256.942 0 .343-.085.657-.256.941a1.923 1.923 0 0 1-.677.682A1.805 1.805 0 0 1 2 4.398Z"
    />
  </Svg>
);
const DotIcon = memo(SvgComponent);
export default DotIcon;
