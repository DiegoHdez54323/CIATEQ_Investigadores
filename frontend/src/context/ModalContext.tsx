import React, { createContext, useContext, useState, ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalContextType {
  openModal: (content: ReactNode, title?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");

  const openModal = (content: ReactNode, title?: string) => {
    setModalContent(content);
    if (title) setModalTitle(title);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalTitle("");
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalContent &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {modalTitle && (
                <h2 className="text-xl font-bold mb-4">{modalTitle}</h2>
              )}
              {modalContent}
            </div>
          </div>,
          document.getElementById("modal-root")!
        )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
