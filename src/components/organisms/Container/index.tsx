import React from 'react';

import mapModifiers from 'utils/functions';

type Type =
  | 'fullScreen'
  | 'noPaddingRight'
  | 'noPaddingLeft';

interface ContainerProps {
  type?: Type;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  type,
  children,
}) => (
  <div
    className={`container ${mapModifiers(
      'o-container',
      type,
    )}`}
  >
    {children}
  </div>
);

Container.defaultProps = {
  children: undefined,
};

export default Container;
