import { useEffect } from "react";
import { useModal } from "./useModal";
import "./App.css";

export function ModalContainer() {
  const { modals, closeModal } = useModal();

  // Handle ESC (only top modal)
  useEffect(() => {
    if (modals.length === 0) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modals.length, closeModal]);

  return (
    <>
      {modals.map((modal, index) => {
        const isTop = index === modals.length - 1;

        return (
          <div
            key={modal.id}
            className="overlay"
            style={{
              zIndex: 1000 + index,
              background: isTop ? "rgba(0,0,0,0.5)" : "transparent",
            }}
            onMouseDown={() => {
              if (isTop) closeModal();
            }}
          >
            <div
              className="modal"
              style={{
                transform: `scale(${1 - (modals.length - 1 - index) * 0.05})`,
                opacity: index === modals.length - 1 ? 1 : 0.7,
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {modal.content}
            </div>
          </div>
        );
      })}
    </>
  );
}
