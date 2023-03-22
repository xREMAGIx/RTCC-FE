import React from 'react';

import loadingGif from 'assets/images/loading.gif';
import mapModifiers from 'utils/functions';

interface LoadingProps {
  variant?: 'fullScreen';
  isShow?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isShow = false, variant }) => {
  if (!isShow) return null;
  return (
    <div className={mapModifiers('a-loading', variant)}>
      <img className="a-loading_loadingIcon" src={loadingGif} alt="loading" />
    </div>
  );
};

Loading.defaultProps = {
  variant: undefined,
  isShow: false,
};

export default Loading;
