import { useEffect, useRef } from 'react';

const useDidMount = (callback: () => void, dependencies: any[] = []) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      callback();
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useDidMount;
