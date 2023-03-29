import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useMemo, useRef } from 'react';
import { toast } from 'react-toastify';

import { CreateRoomModal, CreateRoomModalRef } from './createRoomModal';

import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Loading from 'components/atoms/Loading';
import Text from 'components/atoms/Text';
import RoomItem from 'components/molecules/RoomItem';
import Container from 'components/organisms/Container';
import { deleteRoomService, getAllRoomService } from 'services/room';
import { RoomData } from 'services/room/types';
import { useAppSelector } from 'store/hooks';
import { TOAST_ERROR_MESSAGE } from 'utils/constants';
import { roomKeys } from 'utils/queryKeys';

const Home: React.FC = () => {
  //* Hooks
  const queryClient = useQueryClient();

  //* Stores
  const { userInfo } = useAppSelector((state) => state.auth);

  //* Refs
  const createModalRef = useRef<CreateRoomModalRef>(null);

  //* React hook form

  //* React query
  const { isFetching: roomLoading, data: roomDataRes } = useQuery(
    roomKeys.list(),
    getAllRoomService,
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

  return (
    <>
      <Container>
        <div className="p-home">
          <div className="p-home_header">
            <Heading
              modifiers={['20x30', 'eerieBlack', '700']}
              content={`Welcome, ${userInfo?.username}`}
            />
            <div className="p-home_create_room_btn">
              <Button
                modifiers={['primary', 'lg']}
                type="button"
                onClick={handleCreateRoom}
              >
                <Text modifiers={['16x24', '600', 'white', 'center']} content="Create room" />
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
