/* eslint-disable react/button-has-type */
import React from 'react';

import loadingGif from 'assets/images/loading.gif';
import Icon, { IconName, IconSize } from 'components/atoms/Icon';
import mapModifiers from 'utils/functions';

type Sizes = 'md' | 'lg';
type Variant = 'primary' | 'secondary' | 'outline' | 'transparent' | 'inline' | 'error';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  modifiers?: (Variant | Sizes)[];
  isSubmit?: boolean;
  loading?: boolean;
  radius?: number;
  iconName?: IconName;
  sizeIcon?: IconSize
}

const Button: React.FC<ButtonProps> = ({
  modifiers,
  isSubmit,
  loading,
  children,
  iconName,
  sizeIcon,
  ...props
}) => (
  <button
    type={props.type || 'button'}
    className={mapModifiers(
      'a-button',
      modifiers,
      loading && 'loading',
    )}
    {...props}
  >
    <div className="a-button_wrapper">
      {loading ? (
        <img className="a-button_loadingIcon" src={loadingGif} alt="loading" />
      )
        : (
          <>
            {
              iconName && (
                <div className="a-button_icon">
                  <Icon iconName={iconName} size={sizeIcon} />
                </div>
              )
            }
            {children}
          </>
        )}
    </div>
  </button>
);

export default Button;
