import { Story, Meta } from '@storybook/react';
import React, { useState } from 'react';

import CustomModal from '.';

export default {
  title: 'Components/organisms/Modal',
  component: CustomModal,
  argTypes: {},
} as Meta;

export const Normal: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>Open Modal</button>
      <CustomModal showIconClose isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <h2 className="font-weight-bold text-center">
          <b>
            Cho phép truy
            cập vị trí
          </b>
        </h2>
        <p className="text-center mt-1">
          https://heineken.com.vn muốn sử dụng thông tin vị trí thiết bị của bạn.
        </p>
      </CustomModal>
    </>
  );
};
