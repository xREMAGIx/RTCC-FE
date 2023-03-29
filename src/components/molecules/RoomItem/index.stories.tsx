import { Story, Meta } from '@storybook/react';
import React from 'react';

import RoomItem from '.';

export default {
  title: 'Components/molecules/RoomItem',
  component: RoomItem,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <RoomItem id={1} code="" name="" />
);
