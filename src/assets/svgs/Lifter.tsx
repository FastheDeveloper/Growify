import * as React from 'react';
import Svg, { SvgProps, Path, Defs, Pattern, Use, Image } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path fill="url(#a)" d="M0 0h64v64H0z" />
    <Defs>
      <Pattern id="a" width={1} height={1} patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#b" transform="scale(.02083)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADcklEQVR4nO2XzUsUYRzH52rXOkRB4ZIJ0SWjIErtTV2d30gXoQ7Jov0BvsyYGuILRZShHjQqRQLX0hVX2bUdzbA0K6I6KdnbKT0EolJ2cBX9xjPrbOvuuC/WOiPuF77MMjO78/08z+/3zLMcF1NMmyOIlA6Rb4bIf4JEvz3mJyDRA5QIaZxRBSk7ESKNQCKE8DCKMg9yRhIkSoXEz7GAiwUZmLx4BGPmeLxL3aN4LMOknGPXFAiRZlGclcIZZuQlT/iZvJN4f3ov3ibv1jS7xu7xQkh8ghFG/7kafr3g/vZCSDSsb/gSIU0tm2AjrzUTSwVmFeKcfgAS38JCsPoON7xq9p3VUrqvH4CoLJUYM5sCAo7k83D0OuHsdWA4LzPgOmtszwzwE3oCzLMQWuXDgl8uLEduUTmcPQ7NMvLMAD9vWIDconLkFl4LDiDRTwOUUHxAQFY2DIKFHwlWQiJ91BOgeaNNPHUpSe2Be3oCnN/wMlq4uowWC2d1A2CCSEORvshm80+pDfyC01so5U2Q+OlwtxLe8BLNoFQ4wBlBKM5K8extSHnDsp4YN5uUwMzsM6t5b9mw8BKfzBlJkPgEdV8U1KzkjDLyWmJ7G7Y9WKlIB65mKWaflyvMsu4NG4ncHQnw9WL3cZHbSlq0HYK78yDcnYlY7DqMJfuJW9xWEmQBfi7jjCI4aAdcVAOZvkEmt+coVMOWE7cugEto5AwTXqY3GiPMQr5WIQKutQmh/uyvcXPp6Ep7Zf+v3utdn+Xb1p5nda3lA3ceHv13AGXkNcL/dZUmQFdkAE3SB023lI0u22qcc303O8YH61ofoz/7DBy0K3wAT7msD+Cir5oAT/4PQJOffZ4xDRcNQaa7kOkKBi/sXA/AHWIGFjQBXFEHgJ+nIVPSBmZA+KLc94jWnm/fdABAFl5qAAjVIUqoUrmvln4ooftWw1eQHgALgQC2nDhltdEO/8q7CjUKZpTRSiShowAA7T5gELJQxRpW6Ql2dFGl73tAua/JfAw3aBKlkYNEDaCurZtvsNqnGqx26Ol6q32y3mrP9Cvv0ADsi3qHb1Dd1v09YgDdQ1vXevsBqLJU1MLXXJRlCeN5MYBoyhID8FMMICoA5A65F9L6sWhDWMJ8Hlw06Lc3e7q1APqy9rPQcNE8ZGEAg7QvWpli2nb6A8KUW6v3qyAQAAAAAElFTkSuQmCC"
        id="b"
        width={48}
        height={48}
        preserveAspectRatio="none"
      />
    </Defs>
  </Svg>
);
const Lifter = memo(SvgComponent);
export default Lifter;
