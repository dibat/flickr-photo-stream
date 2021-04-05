import useIsMounted from "./useIsMounted";
import { useCallback, useState } from "react";

const useAsyncState = <T>(defaultValue: T) => {
  const isMounted = useIsMounted();
  const [state, setState] = useState<T>(defaultValue);
  const setValue = useCallback(
    (value: T): void => {
      if (isMounted()) {
        setState(value);
      }
    },
    [isMounted]
  );
  return [state, setValue] as const;
};
export default useAsyncState;
