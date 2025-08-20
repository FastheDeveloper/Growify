import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
import { APP_COLOR } from '~/src/constants/Color';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke={APP_COLOR.PRIMARY_DARK}
      d="m8 0 3 3h1c2 0 2-3 0-3H8Zm.463 2a.5.5 0 0 0-.317.146l-2.5 2.5a.5.5 0 0 0 .042.745l2.158 1.726L6.57 9.242a.501.501 0 0 0 .86.516l1.5-2.5a.5.5 0 0 0-.117-.649L7.304 5.402 9 3.707l1.146 1.147A.501.501 0 0 0 10.5 5H13a.5.5 0 0 0 0-1h-2.293L8.854 2.146A.5.5 0 0 0 8.464 2ZM2.95 6a3 3 0 1 0 .098 6 3 3 0 0 0-.097-6Zm9 0a3 3 0 1 0 .1 6 3 3 0 0 0-.1-6Zm.1 1a2 2 0 1 1-.02 4 2 2 0 0 1 .021-4"
    />
  </Svg>
);
const Cycling = memo(SvgComponent);
export default Cycling;
