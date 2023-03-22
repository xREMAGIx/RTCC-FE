import { Meta, Story } from '@storybook/react';
import React from 'react';

import Image, { ImageBackground } from '.';

export default {
  title: 'Components/atoms/Image',
  component: Image,
  argTypes: {
    ratio: {
      control: {
        type: 'select',
        options: ['1x1', '4x3', '16x9'],
      },
      defaultValue: '1x1',
    },
    size: {
      control: {
        type: 'select',
        options: ['cover', 'contain', 'inherit', 'initial'],
      },
      defaultValue: 'cover',
    },
    maxWidth: {
      control: {
        type: 'text',
      },
      defaultValue: '200px',
    },
  },
} as Meta;

export const normal: Story = ({
  ratio, maxWidth, size,
}) => (
  <div
    style={{
      maxWidth,
      borderRadius: 4,
      overflow: 'hidden',
      margin: 'auto',
      paddingTop: '0px'
    }}
  >
    <Image
      imgSrc="https://source.unsplash.com/random"
      ratio={ratio}
      alt="image"
      size={size}
    />
  </div>
);
export const imageBackground: Story = ({
  ratio, maxWidth, size,
}) => (
  <div
    style={{
      maxWidth,
      borderRadius: 4,
      overflow: 'hidden',
      margin: 'auto',
      paddingTop: '0px'
    }}
  >
    <ImageBackground
      imgSrc="https://source.unsplash.com/random"
      ratio={ratio}
      alt="image"
      size={size}
      // eslint-disable-next-line no-console
      handleClose={() => console.log('===')}
    />
  </div>
);
