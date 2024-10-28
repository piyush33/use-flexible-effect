import { useRef, useCallback } from "react";

// Main deep comparison function
const deepEqual = (a, b) => {
  if (a === b) return true;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((element, index) => deepEqual(element, b[index]));
  }

  if (typeof a === "object" && a !== null && typeof b === "object" && b !== null) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => keysB.includes(key) && deepEqual(a[key], b[key]));
  }

  return false;
};

// Main hook
const UseFlexibleEffect = () => {
  const previousDependencies = useRef([]);

  const triggerEffect = (callback, dependencies) => {
    // If `previousDependencies` is empty, this is the initial run
    let dependenciesChanged = previousDependencies.current.length === 0;

    if (!dependenciesChanged) {
      // Check if dependencies have changed with deep comparison for subsequent runs
      dependenciesChanged = !previousDependencies.current.every((dep, i) => {
        const result = deepEqual(dep, dependencies[i]);
        return result;
      });
    }

    if (dependenciesChanged) {
      callback();
      previousDependencies.current = dependencies; // Update previous dependencies
    } else {
      console.log("No dependency changes detected.");
    }
  };
  return triggerEffect;
};

export default UseFlexibleEffect;
