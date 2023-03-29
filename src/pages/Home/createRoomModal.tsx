import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Input from 'components/atoms/Input';
import Text from 'components/atoms/Text';
import CustomModal from 'components/organisms/Modal';
import { createRoomService } from 'services/room';
import { RoomData } from 'services/room/types';
import { TOAST_ERROR_MESSAGE } from 'utils/constants';
import { roomKeys } from 'utils/queryKeys';

export type FormTypes = {
  name: string;
  description: string;
};

export interface CreateRoomModalProps {
}

export interface CreateRoomModalRef {
  setModal: (isOpen: boolean) => void;
}

export const CreateRoomModal = forwardRef<CreateRoomModalRef, CreateRoomModalProps>((_, ref) => {
  //* Hooks
  const queryClient = useQueryClient();

  //* Stores

  //* States
  const [isOpen, setIsOpen] = useState(false);

  //* React hook form
  const method = useForm<FormTypes>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  //* React-query
  const {
    mutate: createRoomMutate,
    isLoading: createRoomLoading,
  } = useMutation(
    roomKeys.create(),
    createRoomService,
    {
      onSuccess: (res) => {
        const currentList: RoomData[] | undefined = queryClient.getQueryData(roomKeys.list());
        queryClient.setQueryData(roomKeys.list(), [...currentList || [], res]);
        method.reset();
        setIsOpen(false);
      },
      onError: () => {
        toast.error(TOAST_ERROR_MESSAGE.GENERAL);
      },
    }
  );

  //* Imperative Handler
  useImperativeHandle(ref, () => ({
    setModal: (open) => setIsOpen(open),
  }));

  //* Functions
  const handleCreateRoom = (data: FormTypes) => {
    createRoomMutate({
      name: data.name,
      description: data.description,
    });
  };

  return (
    <CustomModal isOpen={isOpen} modifiers={['width-992']}>
      <div className="p-home_create_room_modal">
        <Heading type="h3" modifiers={['center', '32x42', '700', 'smokyBlack']}>Create Room</Heading>
        <div className="p-home_create_room_modal_form u-mt-32">
          <FormProvider {...method}>
            <form
              noValidate
            >
              <div className="p-createRoom_form_username u-mt-24">
                <Controller
                  name="name"
                  rules={{
                    required: 'Room name is required'
                  }}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      label="Name"
                      placeholder="Name"
                      id="room-name"
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </div>
              <div className="p-createRoom_form_password u-mt-16">
                <Controller
                  name="description"
                  rules={{
                    required: 'Description is required'
                  }}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      label="Description"
                      placeholder="description"
                      id="room-description"
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </div>
              <div className="p-createRoom_form_submit u-mt-24">
                <Button
                  modifiers={['primary', 'lg']}
                  type="submit"
                  loading={createRoomLoading}
                  onClick={method.handleSubmit(handleCreateRoom)}
                >
                  <Text modifiers={['16x24', '600', 'white', 'center']} content="Create" />
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </CustomModal>
  );
});

export default CreateRoomModal;
