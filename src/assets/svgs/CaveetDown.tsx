import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
import { APP_COLOR } from '~/src/constants/Color';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={APP_COLOR.PRIMARY}
      fillRule="evenodd"
      d="M5.345 7.943a.625.625 0 0 1 .879-.098L10 10.867l3.776-3.022a.625.625 0 1 1 .781.977l-4.167 3.333a.625.625 0 0 1-.78 0L5.443 8.822a.625.625 0 0 1-.098-.879Z"
      clipRule="evenodd"
    />
  </Svg>
);
const CavetDownIcon = memo(SvgComponent);
export default CavetDownIcon;
