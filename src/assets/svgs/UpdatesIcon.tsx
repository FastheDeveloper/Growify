import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Circle cx={16} cy={12} r={11.5} stroke="#E6E6E6" />
    <Circle cx={16} cy={12} r={6} fill="#B3B3B3" />
    <Path stroke="#E6E6E6" strokeLinecap="round" strokeWidth={2} d="M16 54.8V24" />
  </Svg>
);
const UpdatesIcon = memo(SvgComponent);
export default UpdatesIcon;
