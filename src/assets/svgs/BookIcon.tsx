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
      d="M8 2.5S6.95 1 4.5 1 1 2.5 1 2.5V13s1.05-.75 3.5-.75S8 13 8 13M8 2.5V13M8 2.5S9.05 1 11.5 1 15 2.5 15 2.5V13s-1.05-.75-3.5-.75S8 13 8 13"
    />
  </Svg>
);
const Book = memo(SvgComponent);
export default Book;
