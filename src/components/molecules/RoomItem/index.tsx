import React from 'react';

import Button from 'components/atoms/Button';
import Text from 'components/atoms/Text';

interface RoomItemProps {
  id: number;
  code: string;
  name: string;
  description?: string;
  isDeleteLoading?: boolean;
  handleJoin?: () => void;
  handleDelete?: () => void;
}

const RoomItem: React.FC<RoomItemProps> = ({
  id, code, name, description, isDeleteLoading,
  handleJoin, handleDelete
}) => (
  <div key={`${id}-room`} className="o-room-item">
    <div className="o-room-item_content">
      <div className="o-room-item_code">
        <Text modifiers={['16x24', '600', 'gunmetal']} content={code} />
      </div>
      <div className="o-room-item_name">
        <Text modifiers={['16x24', 'gunmetal']} content={name} />
      </div>
      <div className="o-room-item_description">
        <Text modifiers={['16x24', 'gunmetal']} content={description} />
      </div>
    </div>
    <div className="o-room-item_btns">
      <Button
        modifiers={['secondary', 'lg']}
        type="button"
        onClick={handleJoin}
      >
        <Text modifiers={['16x24', '600', 'white', 'center']} content="Join" />
      </Button>
      <div className="o-room-item_delete_btn u-mt-8">
        <Button
          loading={isDeleteLoading}
          modifiers={['outline', 'lg']}
          type="button"
          onClick={handleDelete}
        >
          <Text modifiers={['16x24', '600', 'crayola', 'center']} content="Delete" />
        </Button>
      </div>
    </div>
  </div>
);

RoomItem.defaultProps = {
};

export default RoomItem;
