import { Story, Meta } from '@storybook/react';
import React from 'react';

import Text from '.';

export default {
  title: 'Components/atoms/Text',
  component: Text,
  argTypes: {
    sizes: {
      control: {
        type: 'select',
        options: [
          '14x20',
          '16x24',
        ],
      },
      defaultValue: '14x20',
    },
    text: {
      control: {
        type: 'text',
      },
      defaultValue: 'Nhập ghi chú cho trạng thái các POSM',
    },
    colors: {
      control: {
        type: 'select',
        options: [
          'white',
          'black',
        ],
      },
      defaultValue: 'black',
    },
    fontweight: {
      control: {
        type: 'select',
        options: [
          '100',
          '200',
          '300',
          '400',
          '500',
          '600',
          '700',
          '800',
          '900',
        ],
      },
      defaultValue: '400',
    },
    variants: {
      control: {
        type: 'radio',
        options: [
          'uppercase',
          'capitalize',
          'underline',
          'italic',
          'center',
          'justify',
          'normal',
          'right',
          'left',
          'nowrap',
        ],
      },
    },
    type: {
      control: {
        type: 'radio',
        options: ['p', 'span', 'div'],
      },
      defaultValue: 'p',
    },
  },
} as Meta;

export const normal: Story = ({
  sizes,
  colors,
  variants,
  text,
  fontweight,
  type,
}) => (
  <Text type={type} modifiers={[sizes, colors, variants, fontweight]}>
    {text}
  </Text>
);
