"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
}
const Portal = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);
  const portalEl: HTMLElement = window.document.getElementById("portal")!;

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, portalEl) : null;
};

export { Portal };
