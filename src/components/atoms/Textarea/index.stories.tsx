import { Story, Meta } from '@storybook/react';
import React from 'react';

import TextArea from '.';

export default {
  title: 'Components/atoms/TextArea',
  component: TextArea,
  argTypes: {
    rows: {
      control: 'select',
      options: ['2', '3', '4', '5'],
    },
    modifier: {
      control: {
        type: 'select',
        options: ['default'],
      },
      defaultValue: 'default',
    },
    error: {
      control: 'text',
    },
    label: {
      control: 'text',
      defaultValue: 'Khó khăn',
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Nhập các khó khăn ',
    },
    disabled: {
      control: 'boolean',
      options: [true, false],
      defaultValue: false,
    },
  },
} as Meta;

export const normal: Story = ({
  rows, value, error, label, placeholder, disabled, modifier,
}) => (
  <div>
    <TextArea
      rows={rows}
      error={error}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      label={label}
      id="text"
      modifier={modifier}
    />
  </div>
);
