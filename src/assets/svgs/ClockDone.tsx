import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
import { APP_COLOR } from '~/src/constants/Color';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={props.color || APP_COLOR.PRIMARY_DARK}
      d="m17.625 12.75-3.75 3.75-2.625-2.625 1.125-1.125 1.5 1.5 2.625-2.625 1.125 1.125Zm-7.8 2.175C9.525 15 9.3 15 9 15c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6c0 .3 0 .525-.075.825.525.075.975.225 1.425.45.075-.45.15-.825.15-1.275 0-4.125-3.375-7.5-7.5-7.5S1.5 4.875 1.5 9s3.375 7.5 7.5 7.5c.45 0 .9-.075 1.275-.15-.225-.375-.375-.9-.45-1.425Zm1.875-4.35-2.325-1.35V5.25H8.25v4.5l2.625 1.575c.225-.3.525-.525.825-.75Z"
    />
  </Svg>
);
const ClockDone = memo(SvgComponent);
export default ClockDone;
