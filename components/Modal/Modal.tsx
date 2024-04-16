"use client"
import { Portal } from "../Portal";

interface ModalProps {
  children: React.ReactNode;
  isOpen: Boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose }: ModalProps) {

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className="fixed top-0 flex items-center justify-center z-[1] h-full w-full bg-black/40 overflow-auto"
        onClick={onClose}
      >
        <div
          className="w-3/4 p-5 bg-slate-300 rounded-lg relative"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button type="button" className="text-xl absolute right-0" onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>
    </Portal>
  )
}

export { Modal };

//How to use it

/*
import Modal from '../Modal/Modal';

const Component = () => {
  
  const [modalIsOpen, setModalIsOpen] = useState(true);
          nst handleOpenModal = () => {
    setModalIsOpen(true);
  };
          nst handleCloseModal = () => {
odalIsOpen(false);
  };

             
          
            dal isOpen={modalIsOpen} onClose={handleCloseModal}>
         ...
      </Modal>
    </>
  );
};

export default Component;
*/
