import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={props.color || '#B3B3B3'}
      d="M15.75 13.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3V7.312h13.5V13.5ZM6 10.5A.75.75 0 1 0 6 12a.75.75 0 0 0 0-1.5Zm3 0A.75.75 0 1 0 9 12a.75.75 0 0 0 0-1.5Zm3 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0-9.563c.31 0 .563.252.563.563v1.125h.187a3 3 0 0 1 3 3v.563H2.25v-.563a3 3 0 0 1 3-3h.188V1.5a.563.563 0 0 1 1.125 0v1.125h4.875V1.5c0-.31.251-.563.562-.563Z"
    />
  </Svg>
);
const TasksIcon = memo(SvgComponent);
export default TasksIcon;
