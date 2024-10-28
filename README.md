# useFlexibleEffect

`useFlexibleEffect` is a React custom hook that behaves like `useEffect` but can be conditionally triggered within a function, allowing for more flexible execution control.

## Usage

Here’s an example of how to use the `useFlexibleEffect` hook:

```javascript
import { useEffect, useState } from "react";
import UseFlexibleEffect from "use-flexible-effect";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Initialize useConditional to get the conditional effect function
  const triggerEffect = UseFlexibleEffect();

  const handleSignIn = async () => {
    console.log("Signing in...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = true;
    if (success) {
      setUserData({ name: "John Doe", email: "john@example.com" });
      setIsLoggedIn(true);
    } else {
      console.error("Sign-in failed");
    }
  };

  if(isLoggedIn){
    triggerEffect(() => {
      console.log("User data loaded:", userData);
    }, [userData]);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Testing Conditional useFlexibleEffect</h1>
      {isLoggedIn ? <p>Welcome, {userData?.name}!</p> : <button onClick={handleSignIn}>Sign In</button>}
    </div>
  );
};

export default App;


```

## Installation

```bash
npm install use-flexible-effect
```
