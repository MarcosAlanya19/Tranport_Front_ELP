import React from 'react';

import { Button, Modal } from 'flowbite-react';

interface IProps {
  openModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  title: string;
  btnSubmit: {
    text: string;
    onClick: () => void;
  };
}

export const WrapperModalForm: React.FC<IProps> = (props) => {
  const { openModal, closeModal, btnSubmit, children, title } = props;

  return (
    <Modal dismissible show={openModal} onClose={closeModal}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button fullSized onClick={btnSubmit.onClick}>
          {btnSubmit.text}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
