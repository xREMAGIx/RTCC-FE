import React, {
  forwardRef, useCallback, useMemo, useState
} from 'react';

import IconHidePassword from 'assets/icons/ic_hide_password.svg';
import IconViewPassword from 'assets/icons/ic_view_password.svg';
import Text from 'components/atoms/Text';
import mapModifiers from 'utils/functions';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'number' | 'email' | 'password';
  id: string;
  label?: string;
  subLabel?: string;
  error?: string;
  isError?: boolean;
}

const InputRef: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  type,
  id,
  label,
  subLabel,
  error,
  isError,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = useCallback(() => setShowPassword(!showPassword), [showPassword]);

  const inputType = useMemo(() => {
    if (type === 'password') {
      if (showPassword) {
        return 'text';
      }
      return 'password';
    }
    return type;
  }, [type, showPassword]);

  return (
    <div
      className={mapModifiers(
        'a-input',
        type,
        error && 'error',
        isError && 'error',
      )}
    >
      {label && (
        <div className="a-input_label">
          <label htmlFor={id}>
            <Text
              modifiers={['16x24', '600', 'gunmetal']}
            >
              {label}
            </Text>
          </label>
          {props.required && <span className="a-input_label-required">*</span>}
        </div>
      )}
      {subLabel && (
        <div className="a-input_subLabel">
          <label htmlFor={id}>
            <Text
              modifiers={['14x20', '500', 'gunmetal']}
            >
              {subLabel}
            </Text>
          </label>
        </div>
      )}
      <div className="a-input_wrap">
        <input
          {...props}
          className="a-input_input"
          type={inputType}
          ref={ref}
          placeholder={props.placeholder}
        />
        {type === 'password' && (
          <button type="button" className="a-input_showPassword" onClick={handleClick}>
            <img alt="icon_password" src={showPassword ? IconHidePassword : IconViewPassword} />
          </button>
        )}
      </div>
      {error && (
        <div className={mapModifiers('a-input_messageError')}>
          <Text
            modifiers={['14x20', 'redOrange', '400']}
          >
            {error}
          </Text>
        </div>
      )}
    </div>
  );
};

const Input = forwardRef(InputRef);

Input.defaultProps = {
  children: undefined,
};

export default Input;
