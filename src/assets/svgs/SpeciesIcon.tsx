import * as React from 'react';
import Svg, { SvgProps, Rect, G, Mask, Path, Defs, ClipPath } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Rect width={40} height={40} y={0.5} fill="#D2F9DF" rx={8} />
    <G clipPath="url(#a)">
      <Mask
        id="b"
        width={24}
        height={25}
        x={8}
        y={8}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}>
        <Path fill="#fff" d="M8 8.5h24v24H8v-24Z" />
      </Mask>
      <G stroke="#0F6B2D" strokeMiterlimit={10} strokeWidth={1.406} mask="url(#b)">
        <Path d="M16.04 15.862c0 3.765 3.96 6.506 3.96 6.506s3.96-2.74 3.96-6.506c0-3.765-3.96-6.506-3.96-6.506s-3.96 2.74-3.96 6.506Z" />
        <Path d="M12.466 26.194c2.662 2.663 7.4 1.8 7.4 1.8s.863-4.738-1.8-7.4c-2.662-2.662-7.4-1.8-7.4-1.8s-.862 4.738 1.8 7.4Z" />
        <Path d="M27.534 26.194c-2.663 2.663-7.401 1.8-7.401 1.8s-.862-4.738 1.8-7.4c2.663-2.662 7.401-1.8 7.401-1.8s.862 4.738-1.8 7.4ZM20.133 27.995l4.6-4.6M15.266 23.395l4.6 4.6M20 22.368v-6.506M20 26.336V32.5" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M8 8.5h24v24H8z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const SpeciesIcon = memo(SvgComponent);
export default SpeciesIcon;
