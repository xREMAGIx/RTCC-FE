import React from 'react';

import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Text from 'components/atoms/Text';
import Container from 'components/organisms/Container';
import { useAppSelector } from 'store/hooks';

const Home: React.FC = () => {
  //* Hooks

  //* Stores
  const { userInfo } = useAppSelector((state) => state.auth);

  //* React hook form
  //* Functions
  const handleCreateRoom = () => {

  };

  return (
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
      </div>
    </Container>
  );
};

export default Home;
