import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface GenericToastProps {
  show: boolean;
  onClose: () => void;
  title: string;
  message: string;
  fields?: { name: string; label: string; placeholder: string }[];
  buttons?: { label: string; onClick: (values: any) => void; variant?: string }[];
}

export const GenericToast: React.FC<GenericToastProps> = ({
  show,
  onClose,
  title,
  message,
  fields = [],
  buttons = []
}) => {
  const [values, setValues] = React.useState<any>({});
  const handleChange = (name: string, value: string) => { setValues((prev: any) => ({ ...prev, [name]: value })); };

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static" style={{ zIndex: 2000 }} >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
        {fields.map((f) => (
          <Form.Group className="mb-3" key={f.name}>
            <Form.Label>{f.label}</Form.Label>
            <Form.Control
              type="text"
              placeholder={f.placeholder}
              value={values[f.name] || ""}
              onChange={(e) => handleChange(f.name, e.target.value)}
            />
          </Form.Group>
        ))}
      </Modal.Body>
      <Modal.Footer>
        {buttons.map((btn, idx) => (
          <Button
            key={idx}
            variant={btn.variant || "primary"}
            onClick={() => btn.onClick(values)}
          >
            {btn.label}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
};
