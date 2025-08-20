import * as React from 'react';
import Svg, { SvgProps, Path, Rect } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Rect
      width={19.167}
      height={19.167}
      x={0.417}
      y={0.417}
      stroke="#CCC"
      strokeWidth={0.833}
      rx={4.583}
    />
  </Svg>
);
const CheckBoxEmpty = memo(SvgComponent);
export default CheckBoxEmpty;
