import { Story, Meta } from '@storybook/react';
import React from 'react';

import Input from '.';

export default {
  title: 'Components/atoms/Input',
  component: Input,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Tên đăng nhập',
    },
    type: {
      control: {
        type: 'select',
        options: ['text', 'number', 'email', 'password'],
      },
      defaultValue: false,
    },
    disabled: {
      control: {
        type: 'boolean',
        options: [false, true],
      },
      defaultValue: false,
    },
    placeholder: {
      control: {
        type: 'text',
      },
      defaultValue: 'Nhập tên đăng nhập',
    },
    required: {
      control: {
        type: 'boolean',
        options: [false, true],
      },
      defaultValue: false,
    },
    error: {
      control: {
        type: 'text',
      },
    },
    subLabel: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const normal: Story = ({
  label,
  subLabel,
  disabled,
  placeholder,
  error,
  type,
  required
}) => (
  <div style={{ padding: '4rem' }}>
    <Input
      name="test"
      label={label}
      subLabel={subLabel}
      id="input"
      placeholder={placeholder}
      disabled={disabled}
      error={error}
      type={type}
      required={required}
    />
  </div>
);
