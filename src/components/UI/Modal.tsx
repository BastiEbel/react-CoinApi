import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal() {
  const dialog = useRef();

  useEffect(() => {
    // Using useEffect to sync the Modal component with the DOM Dialog API
    // This code will open the native <dialog> via it's built-in API whenever the <Modal> component is rendered
    const modal: any = dialog.current;
    modal.showModal();

    return () => {
      modal.close(); // needed to avoid error being thrown
    };
  }, []);

  return createPortal(
    <dialog className="modal">Test</dialog>,
    document.getElementById("modal") as HTMLElement
  );
}
