import { useState } from 'react';

const usePublicModule = (module: string) => {
  const [modulePromise] = useState(() => import(/* webpackIgnore: true */ module));

  return modulePromise;
};

export default usePublicModule;
