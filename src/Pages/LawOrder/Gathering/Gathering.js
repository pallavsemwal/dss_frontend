import React, { useState, useRef } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  BreadcrumbItem,
  Breadcrumb,
} from "@bootstrap-styled/v4";
import { useForm, Controller } from "react-hook-form";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import RichTextEditor from "../../../Commons/Editor";
import { initialNotesValue } from "../Constants";
import { CREATE_GATHERING} from "../LawOrderQueries";
import Select from "react-select";
import { ShadowBox, TitleTypeContainer } from "../LawOrderStyled";
import {Link} from 'react-router-dom';
import {GatheringView} from './View';
import {Gathering} from './Home'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone,faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

function GatheringCreate() {
  const { handleSubmit, control, reset} = useForm();
  const [notes, setNotes] = useState(initialNotesValue);

  const type_options = [
    { value: "Political", label: "Political" },
    { value: "Social", label: "Social" },
    { value: "Protest", label: "Protest" },
    { value: "Government", label: "Government" },
    { value: "Religious", label: "Religious" },
  ];

  const [createGathering] = useMutation(CREATE_GATHERING, {
    onError: (error) => {
      alert("Unsuccessful! Try Again!");
    },
    onCompleted: (data) => {

      if (data.createGathering.success) {
        alert("Situation Added Successfully");
      } else {
        alert("Unsuccessful! Try Again!");
      }
    },
  });

  const convertDataIntoObject = (data) => {
    data["date"] = data["date"].split("-").reverse().join("-");
    data["is_close"] = (data["is_close"]["value"]=="close");
    // console.log(data["type"].map((obj) => obj["value"]));
    data["is_religious"] = data["type"].includes("Religious");
    data["is_political"] = data["type"].includes("Political");
    data["is_social"] = data["type"].includes("Social");
    data["is_protest"] = data["type"].includes("Protest");
    data["is_government"] = data["type"].includes("Government");
    data["lessons_learnt"] = notes;
    console.log(data);
    return data;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var object = {};
    
    const formData=new FormData(e.target);
    formData.forEach((value, key) => object[key] = value);
    
    console.log(object);
    object = convertDataIntoObject(object);
    createGathering({ variables: { gatheringData: JSON.stringify(object) } });
    e.target.reset();
    setVal('');
    setLstart('');
  };

  const [eventTitle,setVal]= useState("");
  const [locationStart,setLstart]=useState("");
  const [mic,setMic]= useState(false);
  const [mic2,setMic2]= useState(false);
  const eventTitleChange =(e)=>{
    var val=e.trimStart();
    setVal(val);
    console.log({eventTitle});
  }
  const startLocationChange =(e)=>{
    var val=e.target.value.trimStart();
    setLstart(val);
    console.log({locationStart});
  }
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  const MicClickOn=()=>{
    setMic(true);
    recognition.start();
    console.log({eventTitle});
  }
  
  recognition.onaudioend = function() {
    console.log('Audio capturing ended');
    setMic(false);
  }
  recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
      console.log('No speech was detected. Try again.');  
    };
  }
  recognition.onresult = function(event) {
    var current = event.resultIndex;
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;
  
    // Add the current transcript to the contents of our Note.
    console.log(transcript);
    setVal(eventTitle.concat(" ").concat(transcript));
  }
  const onClickOff=()=>{
    recognition.stop();
    setMic(false);
  }

  // var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition2 = new SpeechRecognition();
  const MicClickOn2=()=>{
    setMic2(true);
    recognition2.start();
    console.log({locationStart});
  }
  
  recognition2.onaudioend = function() {
    console.log('Audio capturing ended');
    setMic2(false);
  }
  recognition2.onerror = function(event) {
    if(event.error == 'no-speech') {
      console.log('No speech was detected. Try again.');  
    };
  }
  recognition2.onresult = function(event) {
    var current = event.resultIndex;
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;
  
    // Add the current transcript to the contents of our Note.
    console.log(transcript);
    setLstart(locationStart.concat(" ").concat(transcript));
  }
  const onClickOff2=()=>{
    recognition2.stop();
    setMic2(false);
  }


  const privacy_options = [
    { value: "open", label: "Open" },
    { value: "close", label: "Close" },
  ];

  
  return (
    <form onSubmit={(e)=>onSubmit(e)}>
      <Breadcrumb>
       <BreadcrumbItem>Law and Order</BreadcrumbItem>
       <BreadcrumbItem>Gathering</BreadcrumbItem>
       <BreadcrumbItem>Create</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col lg="6">
        <h3>Basic Details</h3>
            <TitleTypeContainer>
              <div style={{width: "45%"}}>
              <Label>Title:</Label> &nbsp; <br />
              <div style={{display:'flex', padding:'0px', alignItems:'center',margin:'-10px', justifyContent:'space-around'}}>
              <Input 
                name="title"
                type="text"
                autoComplete="off"
                placeholder="Title"
                value={eventTitle}
                onChange={(e)=>{eventTitleChange(e.target.value)}}
                rules={{ required: true }}
                style={{margin:'0px', borderRight:'none',borderRadius:'4px 0px 0px 4px'}}
              />
              {mic? 
                    <FontAwesomeIcon className="col-1" style={{padding:"0px', ",border:" thin solid #1d8ff0",borderRadius:"4px" ,margin:'10px 0px'}} icon={faMicrophone} />
                      :
                    <FontAwesomeIcon onClick={MicClickOn}  className="col-1" style={{padding:"11px", margin:'10px 0px',border:" thin solid #cecece",height:'14px',borderLeft:'none', borderRadius:"0px 4px 4px 0px" }} icon={faMicrophoneSlash} />
              }
              </div>
              </div>
         
          <div style={{width: "45%"}}>
          <Label>Type:</Label> &nbsp; <br />
              <Select options={type_options} isMulti={true}
                name="type"
                type="select"
    
                rules={{ required: false }}
              />    
          </div>
          </TitleTypeContainer>
          <br/>
          <TitleTypeContainer>
              <div style={{width: "45%"}}>
              <Label>Duration:</Label> &nbsp; <br />
              <Input 
                name="duration"
                type="number"
                autoComplete="off"
                placeholder="50 minutes"
    
                rules={{required: true}}
              />
              </div>
         
          <div style={{width: "45%"}}>
          <Label>Privacy:</Label> &nbsp; <br />
              <Select options={privacy_options} isMulti={false} 
                name="is_close"
                type="select"
    
                rules={{ required: false }}
              />    
          </div>
          </TitleTypeContainer>
          <br/>
          <TitleTypeContainer>
            <div style={{width: "45%"}}>
          <Label>Attendance:</Label> &nbsp; <br />
          <Input 
            name="attendance"
            type="number"
            autoComplete="off"

            rules={{required: true}}
          />
          </div>
          <div style={{width: "45%"}}>
          <Label>Date:</Label> &nbsp; <br />
          <Input
            name="date"
            type="date"
            autoComplete="off"

            rules={{required: true}}
          />
          </div>
          </TitleTypeContainer>
         <br/>
          <TitleTypeContainer>
            <div style={{width: "42%"}}>
                  <Label>Location</Label> &nbsp; <br />
                  <div style={{display:'flex', padding:'0px', alignItems:'center',margin:'-10px', justifyContent:'space-around'}}>
                  <Input  
                    name="location"
                    type="text"
                    value={locationStart}
                    onChange={startLocationChange}
                    style={{margin:'0px', borderRight:'none',borderRadius:'4px 0px 0px 4px'}}
                  />
                  {mic2? 
                    <FontAwesomeIcon className="col-1" style={{padding:"0px', ",border:" thin solid #1d8ff0",borderRadius:"4px",margin:'10px 0px' }} icon={faMicrophone} />
                      :
                    <FontAwesomeIcon onClick={MicClickOn2}  className="col-1" style={{padding:"11px", margin:'10px 0px',border:" thin solid #cecece",height:'14px',borderLeft:'none', borderRadius:"0px 4px 4px 0px" }} icon={faMicrophoneSlash} />
              }
              </div>

                  </div>
          </TitleTypeContainer>
          <br/>
          <h3>Resource Allocation:</h3>
          <TitleTypeContainer>
            
          <div style={{width: "30%"}}>
          <Label>Police Personnels:</Label> &nbsp; <br />
          <Input 
            name="police"
            type="number"
            autoComplete="off"

            rules={{required: true}}
          /></div>
           <div style={{width: "30%"}}>
          <Label>Ambulances:</Label> &nbsp; <br />
          <Input 
            name="ambulance"
            type="number"
            autoComplete="off"

            rules={{required: true}}
          /></div>
           <div style={{width: "30%"}}>
          <Label>Fire fighters:</Label> &nbsp; <br />
          <Input 
            name="firefighter"
            type="number"
            autoComplete="off"

            rules={{required: true}}
          /></div>
          <div style={{width: "30%"}}>
          <Label>Others:</Label> &nbsp; <br />
          <Input 
            name="others"
            type="number"
            autoComplete="off"

            rules={{required: true}}
          /></div>
          </TitleTypeContainer>
          <br/>
          <Button
            color="warning"
            id="submit"
            type="submit"
          >
            Submit
          </Button>{"  "}
          <Link to={"../laworder"}><Button color="warning">Back</Button></Link>
          <br/>
        </Col>
        <Col lg="2">

        </Col>
        <Col lg="4">
          <h3>Lesson's Learned</h3>
          <ShadowBox>
            <RichTextEditor value={notes} setValue={(value) => setNotes(value)} />
          </ShadowBox>
        </Col>
      </Row>
    </form>
  );
}

export default GatheringCreate;
