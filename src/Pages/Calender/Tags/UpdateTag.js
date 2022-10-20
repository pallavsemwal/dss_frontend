import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Form,
  ListGroup,
  Input,
  Label,
} from "@bootstrap-styled/v4";
import { useForm, Controller } from "react-hook-form";
import { DELETE_TAG, UPDATE_TAG } from "./TagQueries";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

const UpdateModalGrid = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 30% 70%;
  grid-template-areas: "left-pane right-pane";
  margin: 8px;  
`

const LeftDiv = styled.div`
  grid-area: left-pane;
  width: 100px;
  height: auto;
  size: 1.2em;
`;

const RightDiv = styled.div`
  grid-area: right-pane;
  margin: 8px;
  height: auto;
`;


function UpdateTagInput({ isAddModal, control }) {
  return (
    <div>
      <Label>{isAddModal ? "Tag:" : "Edit Name:"}</Label> &nbsp; <br />
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
      {/* <Label>{isAddModal ? "Details:" : "Edit Details:"}</Label> &nbsp; <br /> */}
      {/* <Controller
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

function UpdateTagForm({ tags, settingToggle, refetchTags, handleClose }) {
  const [activeTag, setActiveTag] = useState(null);
  const { handleSubmit, control, setValue } = useForm();
  const { addToast } = useToasts();

  useEffect(() => {
    tags["allTags"].forEach((element) => {
      if (element["id"] === activeTag) {
        setValue("tag_name", element["name"]);
        // setValue("tag_details", element["details"])
      }
    })
  }, [activeTag]);

  const [updateTag] = useMutation(UPDATE_TAG, {
    onError: (error) => {
      console.log(error);
      addToast("Unsuccessful! Try Again!", {
        appearance: "error",
        autoDismiss: true,
      });
      handleClose();
    },
    onCompleted: (data) => {
      addToast("Updated Successfully!", {
        appearance: "success",
        autoDismiss: true,
      });
      refetchTags();
    },
  });

  const [deleteTag] = useMutation(DELETE_TAG, {
    onError: (error) => {
      console.log(error);
      addToast("Unsuccessful! Try Again!", {
        appearance: "error",
        autoDismiss: true,
      });
      handleClose();
    },
    onCompleted: (data) => {
      setActiveTag(null);
      setValue("tag_name", "Tag Name")
      // setValue("tag_details", "Tag Details")
      addToast(data.deleteTag.name + " Deleted Successfully!", {
        appearance: "success",
        autoDismiss: true,
      });
      refetchTags();
    },
  });

  const onSave = (data) => {
    if (!activeTag) {
      alert("Please select a Tag!")
    } else {
      updateTag({
        variables: {
          id: activeTag,
          tagData: JSON.stringify(data)
        },
      })
    }
  }

  const onDelete = () => {
    if (!activeTag) {
      alert("Please select a tag!")
    } else {
      deleteTag({
        variables: { id: activeTag }
      })
    }
  }

  const TagListGroupItem = ({ val }) => {
    return (
      <div
        style={{
          cursor: "pointer",
          borderBottom: "1px solid #eee",
          padding: "4px",
        }}
        onClick={() => setActiveTag(val["id"])}>
        {val["name"]}
      </div>
    )
  }

  return (
    <UpdateModalGrid>
      <LeftDiv>
        <ListGroup>
          Tags-
          <br />
          {tags["allTags"].map((val, idx) =>
            <TagListGroupItem key={idx} val={val} />)
          }
        </ListGroup>
      </LeftDiv>
      <RightDiv>
        <Form onSubmit={handleSubmit(onSave)}>
          <UpdateTagInput control={control} />
          <br />
          <Button
            color="secondary"
            disable={!activeTag}
            onClick={() => onDelete()}>
            Delete
          </Button>
          &nbsp;
          <Button
            color="primary"
            disable={!activeTag}
            type="submit">
            Save
          </Button>
        </Form>
        <Button
          color="info"
          size="sm"
          style={{ float: "right" }}
          onClick={() => settingToggle()}>
          Back
        </Button>
      </RightDiv>
    </UpdateModalGrid>
  )
}

export default UpdateTagForm;