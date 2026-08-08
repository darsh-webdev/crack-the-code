import { createContext } from "react";

export type Modal = {
  id: number;
  content: React.ReactNode;
};

export type ModalContextType = {
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  modals: Modal[];
};

export const ModalContext = createContext<ModalContextType | null>(null);
