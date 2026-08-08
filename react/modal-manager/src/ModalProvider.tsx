import { useState, useCallback, type ReactNode } from "react";
import { ModalContext, type Modal } from "./modalContext";
import { ModalContainer } from "./ModalContainer";

let idCounter = 0;

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<Modal[]>([]);

  const openModal = useCallback((content: ReactNode) => {
    setModals((prev) => [...prev, { id: ++idCounter, content }]);
  }, []);

  const closeModal = useCallback(() => {
    setModals((prev) => prev.slice(0, -1));
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modals }}>
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  );
}
