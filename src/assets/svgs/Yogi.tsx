import * as React from 'react';
import Svg, { SvgProps, Path, Defs, Pattern, Use, Image } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path fill="url(#a)" d="M0 0h64v64H0z" />
    <Defs>
      <Pattern id="a" width={1} height={1} patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#b" transform="scale(.02)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={50}
        height={50}
        preserveAspectRatio="none"
      />
    </Defs>
  </Svg>
);
const Yogi = memo(SvgComponent);
export default Yogi;
