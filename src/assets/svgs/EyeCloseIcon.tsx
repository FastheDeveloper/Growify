import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#333"
      strokeLinecap="round"
      strokeWidth={1.25}
      d="m3.333 3.333 13.334 13.334m-5-4.804a2.5 2.5 0 0 1-3.53-3.53m8.203 4.673c.476-.414.902-.831 1.269-1.217a2.57 2.57 0 0 0 0-3.578c-1.63-1.715-4.43-4.044-7.609-4.044-.743 0-1.465.127-2.156.344M5.417 5.67C4.2 6.445 3.165 7.397 2.39 8.21a2.57 2.57 0 0 0 0 3.58c1.63 1.714 4.43 4.043 7.609 4.043 1.557 0 3.022-.558 4.304-1.33"
    />
  </Svg>
);
const EyeCloseIcon = memo(SvgComponent);
export default EyeCloseIcon;
