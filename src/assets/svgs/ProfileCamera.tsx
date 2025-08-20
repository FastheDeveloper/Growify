import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Rect width={39.684} height={39.684} fill="#A9EFE7" rx={19.842} />
    <Path
      fill="#072723"
      d="M21.747 10.96c.66.001 1.275.33 1.641.88l1.388 2.08h.987a3.948 3.948 0 0 1 3.948 3.948v6.908a3.948 3.948 0 0 1-3.948 3.948H13.921a3.948 3.948 0 0 1-3.948-3.948v-6.908a3.948 3.948 0 0 1 3.948-3.947h.987l1.388-2.081a1.975 1.975 0 0 1 1.642-.88h3.809Zm-1.904 7.402a2.96 2.96 0 1 0-.001 5.921 2.96 2.96 0 0 0 0-5.92Zm0-5.427a.987.987 0 1 0-.001 1.973.987.987 0 0 0 0-1.973Z"
    />
  </Svg>
);
const ProfileCamera = memo(SvgComponent);
export default ProfileCamera;
