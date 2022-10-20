import React, {useState} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@bootstrap-styled/v4";

function Terms({children}) {
  const [modal, setModal] = useState(false);
  const handleClose = () => {setModal(!modal);};

  return (
    <span>
      <span onClick={handleClose}>{children}</span> &nbsp;
      <Modal isOpen={modal} toggle={() => handleClose()}>
        <ModalHeader>Terms and Condition</ModalHeader>
        <ModalBody>
          To be filled.
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => handleClose()}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </span>
  );
}

export default Terms;
