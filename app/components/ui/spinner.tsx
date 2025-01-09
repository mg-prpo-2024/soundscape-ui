import { useEffect, useState } from "react";

export function Spinner({ delay = 0 }: { delay?: number }) {
  const [show, setShow] = useState(delay === 0);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, delay);
  }, []);
  if (!show) {
    return null;
  }
  return (
    <>
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-800 border-t-white"></div>
      <span className="sr-only">Loading...</span>
    </>
  );
}
