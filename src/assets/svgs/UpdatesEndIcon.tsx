import * as React from 'react';
import Svg, { SvgProps, Circle } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Circle cx={16} cy={12.6} r={11.5} stroke="#E6E6E6" />
    <Circle cx={16} cy={12.6} r={6} fill="#B3B3B3" />
  </Svg>
);
const UpdatesEndIcon = memo(SvgComponent);
export default UpdatesEndIcon;
