import { RefObject, useState, useEffect, useCallback } from 'react';

export const useIsMobile = (
  customWidth?: number,
  checkLandscape = false
): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = useCallback(() => {
    if (
      window.innerWidth <= (customWidth || 768) ||
      (checkLandscape &&
        window.innerHeight <= (customWidth || 768) &&
        window.innerWidth <= 1245)
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [customWidth]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  return isMobile;
};

export const useHasMounted = (): boolean => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};
