import React, {useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import RichTextEditor from "../../../Commons/Editor";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "@bootstrap-styled/v4";

import {UPLOAD_EVENT_MATERIAL} from "./NotesQueries";

const TextEditorDiv = styled.div`
  padding: 5px;
  background-color: white;
  margin-top: 2px;
  min-height: 150px;
  font-size: 1em;
`;

const DropZoneDiv = styled.div`
  padding: 2px;
  background-color: #e8e8e8;
  margin-top: 2px;
  text-align: center;
  border: 4px gray dotted;
  margin-bottom: 8px;
`;

const FileDiv = styled.div`
  border-bottom: 1px solid gray;
  padding: 4px;
  font-size: 1.2em;
  line-height: 1.5em;
`;

const DeleteSpan = styled.span`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const initialNotesValue = [
  {
    type: "paragraph",
    children: [
      {text: "Make your notes here!", italic: true},
    ],
  },
];

function File({name, remove}) {
  return (
    <FileDiv>
      {name.slice(0, 35)}
      <DeleteSpan style={{float: "right"}} onClick={remove}>
        &#10539;
      </DeleteSpan>
    </FileDiv>
  );
}

function AddNotesModal({
  eventId,
  eventName,
  showNotes,
  setShowNotes,
  children,
}) {
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState(initialNotesValue);
  const handleClose = () => setShowNotes(!showNotes);

  const [uploadEventMaterial] = useMutation(
    UPLOAD_EVENT_MATERIAL,
    {
      onError: (error) => {
        alert("Unsuccessful! Try Again!");
      },
      onCompleted: (data) => {
        alert("Added Successfully!");
      },
    }
  );

  const onDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const removeFile = (idx) => {
    let a = files.slice();
    a.splice(idx, 1);
    setFiles(a);
  };

  const onSubmit = () => {
    uploadEventMaterial({
      variables: {
        eventId: eventId,
        files: files,
        notes: JSON.stringify(notes),
      },
    });
    setShowNotes(false);
  };

  return (
    <span>
      <span onClick={handleClose}>{children}</span> &nbsp;
      <Modal isOpen={showNotes} toggle={() => handleClose()}>
        <ModalHeader>Make Notes</ModalHeader>
        <ModalBody>
          <Label>{eventName}</Label> &nbsp; <br /> <br />
          <TextEditorDiv>
            <RichTextEditor value={notes} setValue={setNotes} />
          </TextEditorDiv>
          <DropZoneDiv>
            <Dropzone onDrop={onDrop}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()} style={{outline: "none"}}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </DropZoneDiv>
          {files.length !== 0 && <h3>Files</h3>}
          {files.map((file, idx) => (
            <File key={idx} remove={() => removeFile(idx)} name={file.name} />
          ))}
          <br />
          <Button color="primary" onClick={onSubmit}>
            Submit
          </Button>
          &nbsp;
          <Button color="secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
        </ModalBody>
      </Modal>
    </span>
  );
}

export default AddNotesModal;
