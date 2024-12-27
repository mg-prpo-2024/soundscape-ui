import { useEffect, useState } from "react";

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  return show && children;
}
