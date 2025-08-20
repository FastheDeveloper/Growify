import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={props.color || '#B3B3B3'}
      fillRule="evenodd"
      d="M12.802 16.5h-6.27c-1.732 0-3.136-1.34-3.136-2.992V9.85c0-.531-.221-1.04-.615-1.416-.911-.87-.793-2.312.25-3.036l4.792-3.326a3.257 3.257 0 0 1 3.688 0l4.791 3.326c1.043.724 1.162 2.165.25 3.036a1.957 1.957 0 0 0-.615 1.416v3.658c0 1.653-1.403 2.992-3.135 2.992Zm-4.635-3.563a.562.562 0 1 0 0 1.126h3a.563.563 0 0 0 0-1.126h-3Z"
      clipRule="evenodd"
    />
  </Svg>
);
const HomeIcon = memo(SvgComponent);
export default HomeIcon;
