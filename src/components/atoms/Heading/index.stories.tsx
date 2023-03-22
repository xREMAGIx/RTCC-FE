import { Story, Meta } from '@storybook/react';
import React from 'react';

import Heading from '.';

export default {
  title: 'Components/atoms/Heading',
  component: Heading,
  argTypes: {
    sizes: {
      control: {
        type: 'select',
        options: [
          '32x42',
          '16x24',
        ],
      },
      defaultValue: '32x42',
    },
    text: {
      control: {
        type: 'text',
      },
      defaultValue: 'Cho phép truy cập vị trí',
    },
    colors: {
      control: {
        type: 'select',
        options: [
          'white',
          'black',
          'laSalleGreen'
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
        options: ['h1', 'h2', 'h3', 'h4', 'h5'],
      },
      defaultValue: 'h2',
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
  <Heading type={type} modifiers={[sizes, colors, variants, fontweight]}>
    {text}
  </Heading>
);
