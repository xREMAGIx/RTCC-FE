import { Story, Meta } from '@storybook/react';
import React from 'react';

import Loading from '.';

export default {
  title: 'Components/atoms/Loading',
  component: Loading,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['fullScreen', 'default'],
      },
      defaultValue: 'fullScreen',
    },
  },
} as Meta;

export const normal: Story = ({ variant }) => (
  <Loading isShow variant={variant} />
);
