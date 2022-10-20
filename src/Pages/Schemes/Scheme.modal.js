import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "@bootstrap-styled/v4";
import AddSchemeForm from "./AddScheme"
// import UpdateTagForm from "./UpdateTag"

function SchemeModal({ children }) {
  const [modal, setModal] = useState(false);
//   const [ManageTags, setManageTags] = useState(false);
//   const toggleSettings = () => setManageTags(!ManageTags)
  const toggleModal = () => {
    setModal(!modal);
    // setManageTags(false)
  }
  return (
    <span>
      <span onClick={toggleModal}>{children}</span> &nbsp;
      <Modal isOpen={modal} toggle={() => toggleModal()}>
        <ModalHeader>{"Add New Scheme"}</ModalHeader>
        <ModalBody>
          {
              <AddSchemeForm
                handleClose={toggleModal}
                // settingToggle={toggleSettings}
              />
          }
        </ModalBody>
      </Modal>
    </span>
  );
}

export default SchemeModal;
