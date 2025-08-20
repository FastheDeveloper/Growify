import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Rect width={32} height={32} fill="#fff" rx={6.4} />
    <Path
      fill="#999"
      fillRule="evenodd"
      d="M11.125 6h6.689l5.666 5.911v11.484A2.606 2.606 0 0 1 20.875 26h-9.75a2.606 2.606 0 0 1-2.605-2.605V8.605A2.606 2.606 0 0 1 11.125 6Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M17.805 6v5.86h5.675L17.805 6Z"
      clipRule="evenodd"
      opacity={0.302}
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M18.541 15.996h-5.082a.697.697 0 0 0-.694.694v3.23c0 .38.313.693.694.693h5.082a.69.69 0 0 0 .685-.693v-3.23a.69.69 0 0 0-.685-.694Zm-3.696.871c.415 0 .745.338.745.744 0 .415-.33.753-.745.753a.754.754 0 0 1-.752-.753c0-.406.338-.744.752-.744Zm3.924 3.053a.235.235 0 0 1-.228.237h-5.082a.235.235 0 0 1-.229-.237v-.135l.922-.922.761.761a.23.23 0 0 0 .33 0l1.911-1.911 1.615 1.615v.592Z"
      clipRule="evenodd"
    />
  </Svg>
);
const ImageIcon = memo(SvgComponent);
export default ImageIcon;
