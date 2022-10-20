import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Form,
  Label,
} from "@bootstrap-styled/v4";
import { useForm, Controller } from "react-hook-form";
import { CREATE_TASK } from "./TaskQueries";
import { useToasts } from "react-toast-notifications";

function AddTaskModel({ refreshCalender, children }) {
  const [modal, setModal] = useState(false);
  const { handleSubmit, control } = useForm();
  const handleClose = () => setModal(!modal);

  // Notification setup
  const { addToast } = useToasts();

  const [createTask] = useMutation(CREATE_TASK, {
    onError: (error) => {
      console.log(error);
      addToast("Unsuccessful! Try Again!", {
        appearance: "error",
        autoDismiss: true,
      });
      // alert("Unsuccessful! Try Again!");
    },
    onCompleted: (data) => {
      refreshCalender();
      addToast("Added " + data.createTask.task.taskName + " Successfully!", {
        appearance: "success",
        autoDismiss: true,
      });
      // alert("Added " + data.createTask.task.taskName + " Successfully!");
    },
  });

  const onSubmit = (data) => {
    createTask({
      variables: { taskData: JSON.stringify(data) },
    });
    handleClose();
  };

  const getCurrentDate = () => {
    const curr_date = new Date();
    const mm = curr_date.getMonth() + 1; // getMonth() is zero-based
    const dd = curr_date.getDate();
    return [
      curr_date.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
    ].join("-");
  };

  return (
    <span>
      <span onClick={handleClose}>{children}</span> &nbsp;
      <Modal isOpen={modal} toggle={() => handleClose()}>
        <ModalHeader>Add Task</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Label>Task Title:</Label> &nbsp; <br />
            <Controller
              as={<Input style={{ width: "95%" }} />}
              name="task_name"
              type="text"
              autoComplete="off"
              placeholder="Task Name"
              control={control}
              rules={{ required: true }}
            />
            <br />
            <Row>
              <Col>
                <Label>Date:</Label> &nbsp; <br />
                <Controller
                  as={<Input />}
                  name="task_date"
                  type="date"
                  defaultValue={getCurrentDate()}
                  control={control}
                  rules={{ required: true }}
                />
              </Col>
            </Row>
            <br />
            <Button color="primary" type="submit">
              {" "}
              Submit{" "}
            </Button>{" "}
            &nbsp;
            <Button color="secondary" onClick={() => handleClose()}>
              {" "}
              Cancel{" "}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </span>
  );
}

export default AddTaskModel;
