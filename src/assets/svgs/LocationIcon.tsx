import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';
import { memo } from 'react';
import { APP_COLOR } from '~/src/constants/Color';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={APP_COLOR.PRIMARY}
      d="M8 9.333a2.67 2.67 0 0 0 2.666-2.666A2.67 2.67 0 0 0 8 4a2.67 2.67 0 0 0-2.667 2.667A2.67 2.67 0 0 0 8 9.333Zm0-4A1.335 1.335 0 0 1 8 8a1.335 1.335 0 0 1-1.334-1.333c0-.736.598-1.334 1.334-1.334Z"
    />
    <Path
      fill={APP_COLOR.PRIMARY}
      d="M7.614 14.543a.667.667 0 0 0 .773 0c.203-.144 4.966-3.583 4.947-7.876A5.34 5.34 0 0 0 8 1.333a5.339 5.339 0 0 0-5.333 5.33c-.02 4.297 4.744 7.736 4.947 7.88ZM8 2.667c2.206 0 4 1.794 4 4.003.014 2.959-2.925 5.615-4 6.487-1.074-.872-4.014-3.53-4-6.49 0-2.206 1.794-4 4-4Z"
    />
  </Svg>
);
const LocationIcon = memo(SvgComponent);
export default LocationIcon;
