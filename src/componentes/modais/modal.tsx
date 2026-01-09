import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type CampoFormulario = {
  name: string;
  label: string;
  type: string;
  options?: { label: string; value: string | number }[];
  placeholder?: string;
  required?: boolean;
};

type ModalGenericoProps = {
  show: boolean;
  onHide: () => void;
  titulo: React.ReactNode;
  campos: CampoFormulario[];
  initialValues?: Record<string, any>;
  onSubmit: (dados: Record<string, any>) => void;
};

export function ModalGenerico({ show, onHide, titulo, campos, initialValues = {}, onSubmit }: ModalGenericoProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);

 
  useEffect(() => {
    if (show) {
      setFormData(initialValues);
    }
  }, [show, initialValues]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, type, value } = e.target;
    setFormData(prev => ({
      ...prev,
      
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {campos.map(({ name, label, type, options, placeholder, required }) => {
            switch (type) {
              case "textarea":
                return (
                  <Form.Group className="mb-3" controlId={name} key={name}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                      as="textarea"
                      name={name}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required={required}
                    />
                  </Form.Group>
                );

              case "select":
                return (
                  <Form.Group className="mb-3" controlId={name} key={name}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Select
                      name={name}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      required={required}
                    >
                      <option value="">Selecione...</option>
                      {options?.map(({ label, value }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                );

              case "checkbox":
                return (
                  <Form.Group className="mb-3" controlId={name} key={name}>
                    <Form.Check
                      type="checkbox"
                      label={label}
                      name={name}
                      checked={!!formData[name]}
                      onChange={handleChange}
                      required={required}
                    />
                  </Form.Group>
                );

              case "radio":
                return (
                  <Form.Group className="mb-3" controlId={name} key={name}>
                    <Form.Label>{label}</Form.Label>
                    {options?.map(({ label: optLabel, value }) => (
                      <Form.Check
                        type="radio"
                        key={value}
                        label={optLabel}
                        name={name}
                        value={value}
                        checked={formData[name] === value}
                        onChange={handleChange}
                        required={required}
                      />
                    ))}
                  </Form.Group>
                );

              default:
                return (
                  <Form.Group className="mb-3" controlId={name} key={name}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                      type={type}
                      name={name}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required={required}
                    />
                  </Form.Group>
                );
            }
          })}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onHide}>
            Cancelar
          </Button>
          <Button type="submit" variant="success">
            Concluir
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
