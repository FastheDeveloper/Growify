import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
import { APP_COLOR } from '~/src/constants/Color';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke={APP_COLOR.PRIMARY_DARK}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m8.2 8.65-.8 2.55.8 2.55m0-5.1-2-1.275-.4 3.825m2.4-2.55 2.8 1.7v4.675M8.2 13.75H7L5.8 11.2m2.4 2.55 2.8 1.275M5.8 11.2V4.4L9 1M5.8 11.2l.8 2.55m0 0H3.4L1 18m5.6-4.25.8-5.525-.8 2.55v2.975ZM15 18l-4-2.975m-1.2-8.5a.777.777 0 0 1-.566-.249A.878.878 0 0 1 9 5.675c0-.225.084-.442.234-.601a.777.777 0 0 1 .566-.249c.212 0 .416.09.566.249.15.16.234.376.234.601a.878.878 0 0 1-.234.601.777.777 0 0 1-.566.249Z"
    />
  </Svg>
);
const Yoga = memo(SvgComponent);
export default Yoga;
