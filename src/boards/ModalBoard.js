// import { Formik, Field, Form } from "formik";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, Checkbox, Form } from "semantic-ui-react";

const initialState = {
  modal: { open: false }
};

const ModalBoard = React.forwardRef((props, ref) => {
  const [state, setState] = useState(initialState);

  const { modal } = state;
  const show = () => {
    setState((prev) => ({
      ...prev,
      modal: { open: true }
    }));
  };

  const hide = () => {
    setState({ ...initialState });
  };

  const boardNameOnchange = (e) => {
    props.setBoardName(e.target.value);
  };

  const isFavoriteOnchange = (e) => {
    props.setIsFavorite(!props.isFavorite);
  };

  useImperativeHandle(ref, () => ({ show: show, hide: hide }));

  return (
    <Modal
      show={modal.open}
      onHide={hide}
      className="modal-tabs modal__task modal-zindex"
    >
      <Modal.Body>
        <div>
          <Form className="create-form">
            <Form.Field>
              <label>Nome</label>
              <input
                name="name"
                placeholder="Jane"
                onChange={boardNameOnchange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="checkbox"
                name="isFavorite"
                onChange={isFavoriteOnchange}
              />
            </Form.Field>
            <button onClick={props.createBoard} type="submit">
              Criar
            </button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default ModalBoard;
