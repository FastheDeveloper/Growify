import * as React from 'react';
import Svg, { SvgProps, Rect, Path, Circle } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Rect width={40} height={40} fill="#138639" rx={8} />
    <Path
      fill="#fff"
      d="M22.577 26.5a.423.423 0 0 1 .395.571C22.515 28.2 21.356 29 20 29c-1.357 0-2.515-.801-2.972-1.929a.424.424 0 0 1 .396-.571h5.153ZM20 11c3.229 0 5.946 2.49 6.32 5.794l.345 3.045c.085.756.393 1.468.88 2.04C28.578 23.097 27.739 25 26.17 25H13.83c-1.57 0-2.408-1.904-1.374-3.12a3.817 3.817 0 0 0 .879-2.041l.344-3.045C14.054 13.49 16.771 11 20 11Z"
    />
    <Circle cx={25} cy={14} r={3} fill="#F84646" />
  </Svg>
);
const BellNotified = memo(SvgComponent);
export default BellNotified;
