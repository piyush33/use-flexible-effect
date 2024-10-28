import { useEffect, useRef } from "react";

const useFlexibleEffect = (callback, dependencies, shouldRun) => {
  const hasRunOnMount = useRef(false);

  useEffect(() => {
    // Only run the callback if:
    // - This is the first render (mount), or
    // - The dependencies have changed, or
    // - shouldRun is set to true
    if (!hasRunOnMount.current || shouldRun) {
      callback();
      hasRunOnMount.current = true; // Mark that the initial mount has run
    }
  }, [shouldRun, ...dependencies]);
};

export default useFlexibleEffect;
