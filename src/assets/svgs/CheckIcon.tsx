import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#6AD871"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m2.917 7 2.916 2.916 5.834-5.833"
    />
  </Svg>
);
const CheckIcon = memo(SvgComponent);
export default CheckIcon;
