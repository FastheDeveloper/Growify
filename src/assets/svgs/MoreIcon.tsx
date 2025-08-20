import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
import { APP_COLOR } from '~/src/constants/Color';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke={APP_COLOR.PRIMARY_DARK}
      d="M6.75 6.75v-4.5h-4.5v4.5h4.5Zm6 0v-4.5h-4.5v4.5h4.5Zm-6 6v-4.5h-4.5v4.5h4.5Zm6 0v-4.5h-4.5v4.5h4.5Z"
    />
  </Svg>
);
const More = memo(SvgComponent);
export default More;
