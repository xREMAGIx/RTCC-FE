import { Story, Meta } from '@storybook/react';
import React from 'react';

import Button from '.';

import { iconList } from 'components/atoms/Icon';
import Text from 'components/atoms/Text';

export default {
  title: 'Components/atoms/Button',
  component: Button,
  argTypes: {
    loading: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'outlineGreen', 'transparent'],
      },
      defaultValue: 'primary'
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg']
      },
      defaultValue: 'lg'
    },
    iconName: {
      control: {
        type: 'select',
        options: iconList,
      },
      defaultValue: 'default',
    },
  },
} as Meta;

export const normal: Story = ({
  loading, disabled, variant, size, iconName
}) => (
  <div style={{ padding: 20 }}>
    <Button
      loading={loading}
      disabled={disabled}
      modifiers={[variant, size]}
      iconName={iconName}
    >
      <Text modifiers={[variant?.includes('outline') ? 'black' : 'white', '14x20', '700']}>
        Hoàn thành
      </Text>
    </Button>
  </div>
);
