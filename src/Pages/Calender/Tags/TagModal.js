import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "@bootstrap-styled/v4";
import AddTagForm from "./AddTag"
import UpdateTagForm from "./UpdateTag"

function TagModal({ refetchTags, tags, children }) {
  const [modal, setModal] = useState(false);
  const [ManageTags, setManageTags] = useState(false);
  const toggleSettings = () => setManageTags(!ManageTags)
  const toggleModal = () => {
    setModal(!modal);
    setManageTags(false)
  }
  return (
    <span>
      <span onClick={toggleModal}>{children}</span> &nbsp;
      <Modal isOpen={modal} toggle={() => toggleModal()}>
        <ModalHeader>{ManageTags ? "Manage Tags" : "Add Tag"}</ModalHeader>
        <ModalBody>
          {
            ManageTags ?
              <UpdateTagForm
                tags={tags}
                settingToggle={toggleSettings}
                refetchTags={refetchTags}
                handleClose={toggleModal}
              /> :
              <AddTagForm
                handleClose={toggleModal}
                refetchTags={refetchTags}
                settingToggle={toggleSettings}
              />

          }
        </ModalBody>
      </Modal>
    </span>
  );
}

export default TagModal;