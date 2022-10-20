import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Form,
  Input,
  Label,
} from "@bootstrap-styled/v4";
import { useForm, Controller } from "react-hook-form";
import { CREATE_TAG } from "./TagQueries";
import { useToasts } from "react-toast-notifications";

function InputComponent({ control }) {
  return (
    <div>
      <Label>Tag:</Label> &nbsp;
      <Controller
        as={<Input style={{ width: "95%" }} />}
        name="tag_name"
        type="text"
        autoComplete="off"
        placeholder="Tag Name"
        control={control}
        rules={{ required: true }}
      />
      {/* <br /> */}
      {/* <Label>Details:</Label> &nbsp;
      <Controller
        as={<Input style={{ width: "95%" }} />}
        name="tag_details"
        type="text"
        autoComplete="off"
        placeholder="Tag Details"
        control={control}
        rules={{ required: true }}
      /> */}
    </div>
  )
}


function AddTagForm({ handleClose, refetchTags, settingToggle }) {
  const { handleSubmit, control } = useForm();
  const { addToast } = useToasts();
  const [createTag] = useMutation(CREATE_TAG, {
    onError: (error) => {
      console.log(error);
      addToast("Unsuccessful! Try Again!", {
        appearance: "error",
        autoDismiss: true,
      });
      handleClose();
    },
    onCompleted: (data) => {
      handleClose();
      addToast("Added " + data.createTag.tag.name + " Successfully!", {
        appearance: "success",
        autoDismiss: true,
      });
      refetchTags();
    },
  });

  const onSubmit = (data) => {
    console.log(data['tag_name']);
    let m_data = data['tag_name'].split(',');
    console.log(m_data);
    for (var i = 0; i < m_data.length; i++) {
      data['tag_name'] = m_data[i];
      createTag({
        variables: { tagData: JSON.stringify(data) },
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputComponent isAddModal control={control} />
        <br />
        <Button
          color="primary"
          type="submit">
          Submit
        </Button>
        &nbsp;
        <Button
          color="secondary"
          onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          size='sm'
          color="info"
          style={{ float: "right" }}
          onClick={() => settingToggle()}>
          Manage Tags
        </Button>
      </Form>
    </div>
  )
}

export default AddTagForm;