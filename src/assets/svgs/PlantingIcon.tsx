import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#0F6B2D"
      d="M3.38 9.672a4.025 4.025 0 0 1 1.674-5.478c1.046-.56 2.105-.67 3.383-1.108a3.485 3.485 0 0 0 1.692-1.283.11.11 0 0 1 .199.023c.408 1.103 2.053 6.207-1.363 8.657-1.725 1.236-3.824.507-4.707.099a2.24 2.24 0 0 1-.879-.91Z"
      opacity={0.4}
    />
    <Path
      fill="#0F6B2D"
      d="M3.672 12.688a.439.439 0 0 1-.429-.525 12.557 12.557 0 0 1 4.755-6.835.438.438 0 0 1 .525.7A11.905 11.905 0 0 0 4.1 12.34a.438.438 0 0 1-.428.347Z"
    />
  </Svg>
);
const PlantingIcon = memo(SvgComponent);
export default PlantingIcon;
