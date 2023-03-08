import { DependencyList, EffectCallback, useEffect } from "react";

const useDebouncedEffect = (
  effect: EffectCallback,
  deps: DependencyList | undefined,
  delay: number
) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);

    return () => clearTimeout(handler);
  }, [...(deps || []), delay]);
};
export default useDebouncedEffect;
