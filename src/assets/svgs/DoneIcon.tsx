import * as React from 'react';
import Svg, { SvgProps, Path, Circle, Rect } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#FE964A"
      d="M91.569 9.649c0 4.178 6.695 7.564 2.036 7.564-4.66 0-8.437-3.387-8.437-7.564 0-4.178 3.778-7.564 8.437-7.564 4.66 0-2.036 3.386-2.036 7.564ZM157.73 6l1.668 4.08 2.699 3.484-4.367-.595-4.367.595 2.699-3.484L157.73 6Z"
    />
    <Path
      stroke="#0BA259"
      strokeWidth={2.017}
      d="M33.878 79.656s10.748-5.354 13.187-2.548c1.339 1.541 2.35 3.408 1.15 4.925-.924 1.17-2.259 1.319-3.823 1.044-3.313-.582-3.263-5.182-1.933-8.031 1.836-3.934 11.582-1.612 11.582-1.612"
    />
    <Circle cx={228.717} cy={74.292} r={5.883} fill="#FFEDEC" />
    <Path
      stroke="#2F78EE"
      strokeWidth={1.681}
      d="m55.547 135.99.837-7.219 5.836 3.699.665-6.057 5.323 3.667 1.658-6.548"
    />
    <Path
      stroke="#2F78EE"
      strokeWidth={2.017}
      d="M192.801 21.925s-.819-4.86 1.53-5.83c1.972-.813 3.683 2.786 5.304 1.481 1.642-1.322-2.457-3.416-1.122-4.997 1.405-1.664 5.916 0 5.916 0"
    />
    <Path fill="#2F78EE" d="M32.455 14.64 54.06 25.396l-5.4 7.364-16.206-18.12Z" />
    <Circle cx={223.846} cy={94.312} r={2.521} fill="#FFEDEC" />
    <Path
      fill="#2F78EE"
      d="M199.616 127.502c2.771.279 5.464-3.937 5.153-.846-.311 3.091-2.809 5.37-5.58 5.091-2.771-.279-4.765-3.01-4.454-6.101.311-3.091 2.11 1.577 4.881 1.856Z"
    />
    <Path
      fill="#0BA259"
      d="m208.61 38.993 2.78 6.8 4.498 5.807-7.278-.992-7.278.992 4.498-5.808 2.78-6.799Z"
    />
    <Rect width={100} height={100} x={82.3} y={25.823} fill="#19B34C" rx={50} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="m112.3 75.823 5-5 10 10 20-20 5 5-25 25-15-15Z"
      clipRule="evenodd"
    />
  </Svg>
);
const DoneIcon = memo(SvgComponent);
export default DoneIcon;
