'use client';

import {
  createContext,
  useContext,
  useState,
  useRef,
  cloneElement,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '@/app/_hooks/useOutsideClick';
import styles from '@/app/_components/modal/modal.module.scss';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  const [props, setProps] = useState(null);

  const open = (name, newProps = null) => {
    setOpenName(name);
    setProps(newProps);
  };

  const close = () => {
    setOpenName('');
    setProps(null);
  };

  return (
    <ModalContext.Provider value={{ openName, open, close, props }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens, withProps }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(opens, withProps),
  });
}

function Window({ name, children }) {
  const { openName, close, props } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div ref={ref} className={styles.modal}>
        <button onClick={close} className={styles.closeButton}>
          <HiXMark />
        </button>
        <div className={styles.modalContent}>
          {typeof children === 'function'
            ? children({ close, props })
            : children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
