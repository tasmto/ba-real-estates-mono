import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

// A custom implemention of the UseEffect hook that doesnt run on initial render
const useDidMountEffect = (
  effect: EffectCallback,
  deps?: DependencyList | undefined
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current && effect) effect();
    else didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(deps || [])]);
};

export default useDidMountEffect;
