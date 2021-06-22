import { useState } from "react"

const Button: React.FC = () => {
  const [count, setCount] = useState(0);

  const incrementCounter = () => {
    setCount(count => count += 1);
  }

  return <button onClick={incrementCounter}>{count}</button>
}

export { Button };