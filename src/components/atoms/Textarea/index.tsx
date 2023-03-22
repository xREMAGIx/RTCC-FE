import React, { forwardRef } from 'react';

import mapModifiers from 'utils/functions';

interface TextAreaProps {
  rows?: number;
  placeholder?: string;
  error?: string;
  value?: string;
  disabled?: boolean;
  handleOnchange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  label?: string;
  id?: string;
  modifier?: 'default' | 'noLabel' | 'square' | 'labelWhite';
  required?: boolean;
}

const TextAreaRef: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaProps
> = (
  {
    rows = 4,
    placeholder,
    error,
    value,
    disabled,
    label,
    id,
    handleOnchange = () => { },
    modifier,
    required,
  },
  ref,
) => (
  <div className={
      mapModifiers('a-text-area', modifier, error && 'error')
    }
  >
    {label && (
    <label
      className="a-text-area_label"
      htmlFor={id}
    >
      {label}
      {required && <span className="m-datePicker_label-required">*</span>}
    </label>
      )}
    <textarea
      id={id}
      className="a-text-area_inputele"
      value={value}
      ref={ref}
      rows={rows}
      disabled={disabled}
      placeholder={placeholder}
      onChange={handleOnchange}
    />
    {error && <span className="a-text-area_errorMessage">{error}</span>}
  </div>
  );

const TextArea = forwardRef(TextAreaRef);

export default TextArea;
