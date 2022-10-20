import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Form,
  Input,
  Label,
} from "@bootstrap-styled/v4";
import { useForm, Controller } from "react-hook-form";
import { CREATE_SCHEME } from "./SchemeQueries";
import { useToasts } from "react-toast-notifications";
import {GET_ALL_DISTRICTS} from "../District/DistrictQueries";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_INFO } from "../Home/HomeQueries";

function InputComponent({ control }) {
 
  
  return (
    <div>
      <Label>Scheme:</Label> &nbsp;
      <Controller
        as={<Input style={{ width: "95%" }} />}
        name="name"
        type="text"
        autoComplete="off"
        placeholder="Scheme Name"
        control={control}
        rules={{ required: true }}
      />
      {/* <br />
      <Label>District:</Label> &nbsp;
      <Controller
        as={<Input style={{ width: "95%" }} />}
        name="district"
        type="text"
        autoComplete="off"
        placeholder={"District:"+d.data.user.profile.district[0].name}
        value={d.data.user.profile.district[0].name}
        control={control}
        rules={{ required: true }}
      />  */}
      <br />
      <Label>Details:</Label> &nbsp;
      <Controller
        as={<Input style={{ width: "95%" }} />}
        name="details"
        type="text"
        autoComplete="off"
        placeholder="details"
        control={control}
        // rules={{ required: true }}
      />
      <br />
      <Label>Number of people reached:</Label> &nbsp;
      <Controller
        as={<Input style={{ width: "95%" }} />}
        name="num_people_reached"
        type="number"
        autoComplete="off"
        placeholder="Number of people reached"
        control={control}
        // rules={{ required: true }}
      />
      <br />
      <Label>Number of people left:</Label> &nbsp;
      <Controller
        as={<Input style={{ width: "95%" }} />}
        name="num_people_left"
        type="number"
        autoComplete="off"
        placeholder="Number of people left"
        control={control}
        // rules={{ required: true }}
      />
    </div>
  )
}


function AddSchemeForm({ handleClose }) {
  const d= useQuery(GET_USER_INFO,{});
  
  const { handleSubmit, control } = useForm();
  const { addToast } = useToasts();
  const [createScheme] = useMutation(CREATE_SCHEME, {
    onError: (error) => {
      console.log(error);
      console.log('error >>', error);
      addToast("Unsuccessful! Try Again!", {
        appearance: "error",
        autoDismiss: true,
      });
      handleClose();
    },
    onCompleted: (data) => {
      console.log('data >>', data);
      handleClose();
      if(data.createScheme.success){
        addToast("Added " + /*data.createTag.tag.name +*/ " Successfully!", {
          appearance: "success",
          autoDismiss: true,
        });
        window.location.reload();
      }
      else{
        addToast("data.createScheme", {
          appearance: "error",
          autoDismiss: true,
        });
        
      }
      
      // refetchTags();
    },
  });
  const onSubmit = (data) => {
    console.log('onSubmit >>>', data);
    data.district= d.data.user.profile.district[0].name;
    createScheme({
      variables: { schemeData: JSON.stringify(data) },
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputComponent control={control} />
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
      </Form>
    </div>
  )
}

export default AddSchemeForm;