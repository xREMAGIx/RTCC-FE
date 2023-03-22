import React from 'react';

import mapModifiers from 'utils/functions';

export const iconList = {
  eysLogin: 'eysLogin',
  backBlack: 'backBlack',
  logOut: 'logOut',
  dropDown: 'dropDown',
  close: 'close',
  closeWhite: 'closeWhite',
  arrowItemRight: 'arrowItemRight',
  chevronUp: ' chevronUp',
  chevronNext: 'chevronNext',
  arrowItemLeft: 'arrowItemLeft',
  checkIn: 'checkIn',
  posm: 'posm',
  hr: 'hr',
  startReport: 'startReport',
  menuCamera: 'menuCamera',
  endReport: 'endReport',
  survey: 'survey',
  reportCamera: 'reportCamera',
  checkout: 'checkout',
  cameraWhite: 'cameraWhite',
  arrowCirclePrevWhite: 'arrowCirclePrevWhite',
  arrowCircleNextWhite: 'arrowCircleNextWhite',
  arrowPrevWhite: 'arrowPrevWhite',
  cameraGreen: 'cameraGreen',
  loading: 'loading',
  checkoutWhite: 'checkoutWhite',
};

export type IconName = keyof typeof iconList;

export type IconSize = '12' | '16' | '18' | '20' | '24' | '28' | '32' | '36' | '50';
interface IconProps {
  iconName: IconName;
  size?: IconSize;
}
const Icon: React.FC<IconProps> = ({ iconName, size }) => (
  <i className={mapModifiers('a-icon', iconName, size)} />);

Icon.defaultProps = {
  size: '20',
};

export default Icon;
