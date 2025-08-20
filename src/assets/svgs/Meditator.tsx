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
const Meditator = memo(SvgComponent);
export default Meditator;
