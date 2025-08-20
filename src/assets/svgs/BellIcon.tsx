import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';
import { memo } from 'react';
import { APP_COLOR } from '~/src/constants/Color';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={APP_COLOR.TEXT_SECONDARY}
      d="M14 11.18V8a6 6 0 0 0-5-5.91V1a1 1 0 0 0-2 0v1.09A6 6 0 0 0 2 8v3.18A3 3 0 0 0 0 14v2a1 1 0 0 0 1 1h3.14a4 4 0 0 0 7.72 0H15a1 1 0 0 0 1-1v-2a3 3 0 0 0-2-2.82ZM4 8a4 4 0 0 1 8 0v3H4V8Zm4 10a2 2 0 0 1-1.72-1h3.44A2 2 0 0 1 8 18Zm6-3H2v-1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1Z"
    />
  </Svg>
);
const BellIcon = memo(SvgComponent);
export default BellIcon;
