import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useMemo, useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CreateRoomModal, CreateRoomModalRef } from './createRoomModal';

import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Input from 'components/atoms/Input';
import Loading from 'components/atoms/Loading';
import Text from 'components/atoms/Text';
import RoomItem from 'components/molecules/RoomItem';
import Container from 'components/organisms/Container';
import { deleteRoomService, getAllRoomService, getRoomByCodeService } from 'services/room';
import { RoomData } from 'services/room/types';
import { useAppSelector } from 'store/hooks';
import { ROUTES, TOAST_ERROR_MESSAGE } from 'utils/constants';
import { roomKeys } from 'utils/queryKeys';

type FormTypes = {
  code: string;
};

const Home: React.FC = () => {
  //* Hooks
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  //* Stores
  const { userInfo } = useAppSelector((state) => state.auth);

  //* Refs
  const createModalRef = useRef<CreateRoomModalRef>(null);

  //* React hook form
  const method = useForm<FormTypes>({
    defaultValues: {
      code: '',
    },
  });

  //* React query
  const { isFetching: roomLoading, data: roomDataRes } = useQuery(
    roomKeys.list(),
    getAllRoomService,
  );

  const {
    mutate: joinRoomCodeMutate,
    isLoading: joinRoomCodeLoading,
  } = useMutation(
    roomKeys.joinByCode(),
    getRoomByCodeService,
    {
      onSuccess: (_, variables) => {
        method.reset();
        navigation(`/${ROUTES.ROOM}/${variables.code}`);
      },
      onError: () => {
        toast.error(TOAST_ERROR_MESSAGE.ROOM_NOT_FOUND);
      },
    }
  );

  const {
    mutate: deleteRoomMutate,
    isLoading: deleteRoomLoading,
  } = useMutation(
    roomKeys.delete(),
    deleteRoomService,
    {
      onSuccess: (res, variables) => {
        const currentList: RoomData[] | undefined = queryClient.getQueryData(roomKeys.list());
        const newList = [...currentList || []].filter((ele) => ele.id !== variables.id);
        queryClient.setQueryData(roomKeys.list(), newList);
      },
      onError: () => {
        toast.error(TOAST_ERROR_MESSAGE.GENERAL);
      },
    }
  );

  //* Datas
  const roomList = useMemo(() => {
    if (roomDataRes) {
      return roomDataRes.map((ele) => ({
        id: ele.id,
        code: ele.code,
        name: ele.name,
        description: ele.description,
      }));
    }
    return [];
  }, [roomDataRes]);

  //* Functions
  const handleCreateRoom = () => {
    createModalRef.current?.setModal(true);
  };

  const handleDeleteRoom = (id: number) => {
    deleteRoomMutate({
      id
    });
  };

  const handleJoinRoom = (code: string) => {
    navigation(`/${ROUTES.ROOM}/${code}`);
  };

  const handleFormSubmit = (data: FormTypes) => {
    joinRoomCodeMutate({
      code: data.code,
    });
  };

  return (
    <>
      <Container>
        <div className="p-home">
          <div className="p-home_header">
            <Heading
              modifiers={['20x30', 'eerieBlack', '700']}
              content={`Welcome, ${userInfo?.username}`}
            />
            <div className="p-home_join_input">
              <FormProvider {...method}>
                <form
                  className="p-home_join_input_wrapper"
                  noValidate
                >
                  <div className="p-home_join_input_code">
                    <Controller
                      name="code"
                      rules={{
                        required: 'Room code is required'
                      }}
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          placeholder="Enter room code"
                          id="room-code"
                          isError={!!fieldState.error?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="p-home_join_input_submit">
                    <Button
                      modifiers={['primary', 'lg']}
                      type="submit"
                      loading={joinRoomCodeLoading}
                      onClick={method.handleSubmit(handleFormSubmit)}
                    >
                      <Text modifiers={['16x24', '600', 'white', 'center']} content="Join" />
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
            <div className="p-home_create_room_btn">
              <Button
                modifiers={['outline', 'lg']}
                type="button"
                onClick={handleCreateRoom}
              >
                <Text modifiers={['16x24', '600', 'crayola', 'center']} content="Create room" />
              </Button>
            </div>
          </div>
          <div className="p-home_room_list">
            {(() => {
              if (roomLoading) {
                return <Loading isShow />;
              }
              return roomList.map((ele) => (
                <div className="p-home_room_item" key={ele.id}>
                  <RoomItem
                    id={ele.id}
                    code={ele.code}
                    name={ele.name}
                    description={ele.description}
                    isDeleteLoading={deleteRoomLoading}
                    handleJoin={() => {
                      handleJoinRoom(ele.code);
                    }}
                    handleDelete={() => {
                      handleDeleteRoom(ele.id);
                    }}
                  />
                </div>
              ));
            })()}
          </div>
        </div>
      </Container>
      <CreateRoomModal
        ref={createModalRef}
      />
    </>
  );
};

export default Home;
