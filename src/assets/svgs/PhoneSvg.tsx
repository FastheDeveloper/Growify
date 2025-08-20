import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#333"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 19v-1.646a2 2 0 0 0-1.257-1.857l-2.034-.813a2 2 0 0 0-2.532.962L15 16s-2.5-.5-4.5-2.5S8 9 8 9l.354-.177a2 2 0 0 0 .963-2.532l-.814-2.034A2 2 0 0 0 6.646 3H5a2 2 0 0 0-2 2c0 8.837 7.163 16 16 16a2 2 0 0 0 2-2Z"
    />
  </Svg>
);
const PhoneSvg = memo(SvgComponent);
export default PhoneSvg;
