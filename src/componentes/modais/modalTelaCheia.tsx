import Modal from 'react-bootstrap/Modal';

type ModalTelaCheiaProps = {
  state: boolean;
  setState: (value: boolean) => void;
};

export default function ModalTelaCheia({ state, setState }: ModalTelaCheiaProps) {
  return (
    <Modal show={state} fullscreen={true} onHide={() => setState(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>Modal body content</Modal.Body>
    </Modal>
  );
}
