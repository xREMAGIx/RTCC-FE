import React, { useMemo } from 'react';

import Icon from 'components/atoms/Icon';
import useDeviceQueries from 'hooks/useDeviceQueries';
import mapModifiers from 'utils/functions';

export type SizeImageType = 'cover' | 'contain' | 'inherit' | 'initial';

interface ImageProps {
  imgSrc: string;
  srcTablet?: string;
  srcMobile?: string;
  alt: string;
  ratio: Ratio;
  size?: SizeImageType;
  loading?: 'lazy' | 'eager';
  handleClose?: () => void;
  handleClick?: () => void;
}

const Image: React.FC<ImageProps> = ({
  imgSrc,
  srcTablet,
  srcMobile,
  alt,
  ratio,
  size,
  loading,
  handleClose,
  handleClick,
}) => {
  const { isMobile, isTablet } = useDeviceQueries();

  const sourceImage = useMemo(() => {
    if (isMobile) {
      return srcMobile || imgSrc;
    }
    if (isTablet) {
      return srcTablet || imgSrc;
    }
    return imgSrc;
  }, [isMobile, isTablet, imgSrc, srcMobile, srcTablet]);

  return (
    <div className={mapModifiers('a-image', ratio, size)}>
      {
        handleClose && (
          <div onClick={handleClose} className="a-image_iconClose">
            <Icon size="12" iconName="close" />
          </div>
        )

      }
      <img onClick={handleClick} src={sourceImage} alt={alt} loading={loading} />
    </div>
  );
};

export const ImageBackground: React.FC<ImageProps> = ({
  imgSrc,
  alt,
  ratio,
  size,
  srcTablet,
  srcMobile,
  handleClose,
  handleClick,
  loading,
}) => {
  const { isMobile, isTablet } = useDeviceQueries();
  const sourceImage = useMemo(() => {
    if (isMobile) {
      return srcMobile || imgSrc;
    }
    if (isTablet) {
      return srcTablet || imgSrc;
    }
    return imgSrc;
  }, [isMobile, isTablet, imgSrc, srcMobile, srcTablet]);
  return (
    <div className={mapModifiers('a-backgroundImage', ratio, size)} style={{ backgroundImage: `url(${imgSrc})` }}>
      {
        handleClose && (
          <div onClick={handleClose} className="a-backgroundImage_iconClose">
            <Icon size="12" iconName="close" />
          </div>
        )

      }
      <img onClick={handleClick} src={sourceImage} alt={alt} loading={loading} />
    </div>
  );
};
export default Image;
