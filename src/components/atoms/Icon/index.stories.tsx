import { Meta, Story } from '@storybook/react';
import React from 'react';

import Icon, { iconList, IconName } from '.';

export default {
  title: 'Components/atoms/Icon',
  component: Icon,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['12', '16', '18', '20', '24 ', '28'],
      },
      defaultValue: '20',
    },
  },
} as Meta;

const listIcon = Object.keys(iconList).map((item) => item as IconName);

export const normal: Story = ({ size }) => (
  <div style={{
    backgroundColor: '#9999',
    padding: 10,
    display: 'flex',
    flexWrap: 'wrap',
  }}
  >
    {listIcon.map((item, index) => (
      <div key={`icon-name${index.toString()}`} style={{ marginLeft: 7 }}>
        <Icon size={size} iconName={item} />
      </div>
    ))}
  </div>
);
