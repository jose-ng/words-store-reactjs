import Portal from "../Portal";
import styles from "./Modal.module.scss";

function Modal({ children, isOpen, onClose }: any) {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <section className={styles["Modal"]}>
        <div className={styles["Modal-Container"]}>
          <button
            type="button"
            onClick={onClose}
            className={styles["Modal-CloseBtn"]}
          >
            X
          </button>
          {children}
        </div>
      </section>
    </Portal>
  );
}

export default Modal;

// How to use it

/*
import Modal from '../Modal/Modal';

const Component = () => {
  
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
        ...
      </Modal>
    </>
  );
};

export default Component;
*/
