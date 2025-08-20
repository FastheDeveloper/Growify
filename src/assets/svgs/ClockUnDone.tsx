import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
import { APP_COLOR } from '~/src/constants/Color';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={props.color || APP_COLOR.PRIMARY_DARK}
      d="M7.2 3.75v4.5l4.16 2.325.64-.9L8.4 7.65v-3.9H7.2Zm7.2 3.75V12H16V7.5h-1.6Zm0 6V15H16v-1.5h-1.6Zm-1.6 0C11.44 14.475 9.84 15 8 15c-4.4 0-8-3.375-8-7.5S3.6 0 8 0c3.84 0 7.12 2.55 7.84 6h-1.68c-.72-2.55-3.2-4.5-6.16-4.5-3.52 0-6.4 2.7-6.4 6s2.88 6 6.4 6c1.92 0 3.6-.825 4.8-2.025V13.5Z"
    />
  </Svg>
);
const ClockUndone = memo(SvgComponent);
export default ClockUndone;
