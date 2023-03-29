import React from 'react';
import Modal from 'react-modal';

import Icon, { IconName, IconSize } from 'components/atoms/Icon';
import mapModifiers from 'utils/functions';

export type VariantModal = 'default' | 'image';

interface ModalProps {
  isOpen: boolean;
  handleClose?: () => void;
  variant?: VariantModal;
  children?: React.ReactNode;
  showIconClose?: boolean;
  iconName?: IconName;
  sizeIcon?: IconSize;
  modifiers?: string[];
}

const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  variant,
  children,
  showIconClose,
  iconName,
  sizeIcon = '28',
  modifiers,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={handleClose}
    closeTimeoutMS={250}
    className={mapModifiers('o-popup', variant)}
    ariaHideApp={false}
    portalClassName={mapModifiers('o-popup_portal', isOpen && 'open')}
  >
    <div className="o-popup_main">
      <div className={mapModifiers('o-popup_wrapper', modifiers)}>
        {handleClose && showIconClose && (
          <button type="button" className="o-popup_close" onClick={handleClose}>
            <Icon iconName={iconName || 'closeWhite'} size={sizeIcon} />
          </button>
        )}
        <div className="o-popup_body">{children}</div>
      </div>
    </div>
  </Modal>
);

CustomModal.defaultProps = {
  children: undefined,
};

export default CustomModal;
