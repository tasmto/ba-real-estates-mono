import { useEffect, useState } from 'react';

// Hook
function useDebounce<ValueType>(
  value: ValueType,
  delay: number = 300,
  loadingCallback?: (loading: boolean) => void
) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      loadingCallback && loadingCallback(true);
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        loadingCallback && loadingCallback(false);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export default useDebounce;
