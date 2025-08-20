import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={props.color || '#B3B3B3'}
      fillRule="evenodd"
      d="M7.774 1.928a3.05 3.05 0 0 1 3.118 0l3.633 2.151a3.214 3.214 0 0 1 1.558 2.77v4.302a3.214 3.214 0 0 1-1.558 2.77l-.466.275-3.167 1.876a3.05 3.05 0 0 1-3.118 0l-3.166-1.876-.466-.275a3.214 3.214 0 0 1-1.559-2.77V6.85c0-1.143.595-2.198 1.56-2.77l3.631-2.15Zm4.63 9.475c-.803-.56-1.883-.903-3.07-.903-1.188 0-2.268.343-3.072.903-.386.269-.305.821.098 1.063l2.587 1.553a.75.75 0 0 0 .772 0l2.588-1.553c.403-.242.484-.794.098-1.063ZM9.335 4.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z"
      clipRule="evenodd"
    />
  </Svg>
);
const ProfileTab = memo(SvgComponent);
export default ProfileTab;
