import { Button, Modal } from 'flowbite-react';
import React from 'react';

interface IProps {
  active: boolean;
  description?: string;
  onClose: () => void;
  onDeleteConfirm: () => void;
}

export const DiscardModal: React.FC<IProps> = (props) => {
  const { active, onDeleteConfirm, onClose, description } = props;

  return (
    <Modal show={active} onClose={onClose} size='md'>
      <Modal.Header>Confirmar eliminación</Modal.Header>
      <Modal.Body>
        <p>{description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button color='gray' onClick={onClose}>
          Cancelar
        </Button>
        <Button color='red' onClick={onDeleteConfirm}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
