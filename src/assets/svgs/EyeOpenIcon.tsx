import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const EyeOpen = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#333"
      strokeWidth={1.25}
      d="M17.609 8.21a2.57 2.57 0 0 1 0 3.58c-1.63 1.714-4.43 4.043-7.609 4.043-3.18 0-5.979-2.33-7.609-4.044a2.57 2.57 0 0 1 0-3.578C4.021 6.496 6.821 4.167 10 4.167c3.18 0 5.979 2.33 7.609 4.044Z"
    />
    <Path stroke="#333" strokeWidth={1.25} d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
  </Svg>
);
const EyeOpenIcon = memo(EyeOpen);
export default EyeOpenIcon;
