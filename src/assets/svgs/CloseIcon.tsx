import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeWidth={1.125}
      d="m8.25 8.25 7.5 7.5M15.75 8.25l-7.5 7.5"
    />
  </Svg>
);
const CloseIcon = memo(SvgComponent);
export default CloseIcon;
