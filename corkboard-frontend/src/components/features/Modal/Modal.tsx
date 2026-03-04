import './Modal.scss';
import type { ReactNode } from 'react';

type ModalProps = {
    children: ReactNode;
    onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div className="modal">
            <div className="modal__backdrop" onClick={onClose}/>
            <div className='modal__content'>
                {children}
            </div>
        </div>
    );
};
