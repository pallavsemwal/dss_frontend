import React, { useState, useRef } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "@bootstrap-styled/v4";
import {  } from "react-hook-form";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import RichTextEditor from "../../../Commons/Editor";
import { initialNotesValue3 } from "../Constants";
import {
  CREATE_CRIME,
} from "../LawOrderQueries";
import Select from "react-select";
import {
  SpacedInputGroup,
  ShadowBox,
  InputZIndexed,
  InnerContainer,
  TitleTypeContainer,
} from "../LawOrderStyled";
import moment from "moment-timezone";
import {Link} from "react-router-dom";
import {CrimeView} from './View';
import {Crime} from './Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone,faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';


function CrimeCreate() {
  // const { register, handleSubmit, control, watch, reset } = useForm();
  const [notes, setNotes] = useState(initialNotesValue3);

  const [createCrime] = useMutation(CREATE_CRIME, {
    onError: (error) => {
      console.log(error);
      alert("Unsuccessful! Try Again!");
    },
    onCompleted: (data) => {
      if (data.createCrime.success) {
        alert("Situation Added Successfully");
      } else {
        console.log(data);
        alert("Unsuccessful! Try Again!");
      }
    },
  });
  const convertDataIntoObject = (data) => {
    // data["crime_type"] = data["crime_type"];

    
  data["date"] = moment(
        data["date"] + "-" + data["time"],
        "YYYY-MM-DD-hh-mm"
      )
        .utc()
        .format();
  // data["lessons_learnt"] = notes;

        return data
  }
  const onSubmit = (e) => {
    e.preventDefault();
    var object = {};
    
    const formData=new FormData(e.target);
    formData.forEach((value, key) => object[key] = value);
    
    console.log(object);
    object = convertDataIntoObject(object);
    
    object['lesson_learnt']=notes;

    // console.log(object);
    // // // createGathering({ variables: { gatheringData: JSON.stringify(object) } });
    createCrime({variables :{crimeData : JSON.stringify(object)}})
    // e.target.reset();
    // setVal('');
  }

  const crime_options = [
    { value: "Murder", label: "Murder" },
    { value: "Loot", label: "Loot" },
    { value: "Smuggling", label: "Smuggling" },
    { value: "Kidnapping", label: "Kidnapping" },
    { value: "Robbery", label: "Robbery" },
    { value: "Rape", label: "Rape" },
    { value: "Other", label: "Other" },

  ];

  const [eventTitle,setVal]= useState("");
  const [mic,setMic]= useState(false);
  const [type,setType]=useState("");
  const [location,setLocation]= useState('');
  const [mic2,setMic2]= useState(false);

  const typeChange=(e)=>{
    // types.push(e.target.value);
    // setType(types);
    setType(e.value);
    
    // console.log(e);
    // console.log(types);
    
  }

  const eventTitleChange =(e)=>{
    var val=e.trimStart();
    setVal(val);
    // console.log({eventTitle});
  };
  const onLChange =(e)=>{
    var val=e.trimStart();
    setLocation(val);
    // console.log({eventTitle});
  };

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



  var recognition2 = new SpeechRecognition();
  const MicClickOn2=()=>{
    setMic2(true);
    recognition2.start();
    // console.log({locationStart});
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
    setLocation(location.concat(" ").concat(transcript));
  }
  const onClickOff2=()=>{
    recognition2.stop();
    setMic2(false);
  }

  return (
    <form onSubmit={onSubmit}>
      <Breadcrumb>
       <BreadcrumbItem>Law and Order</BreadcrumbItem>
       <BreadcrumbItem>Crime</BreadcrumbItem>
       <BreadcrumbItem>Create</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col lg="6">
          <h3>Basic Details</h3>
          <TitleTypeContainer>
            <InnerContainer>
              <Label>Title:</Label> &nbsp; <br />
              <div style={{display:'flex', width:'100%', padding:'0px', alignItems:'center',margin:'0px', justifyContent:'space-around'}}>
              <InputZIndexed 
                name="title"
                type="text"
                autoComplete="off"
                placeholder="Crime"
                
                value={eventTitle}
                onChange={e=>eventTitleChange(e.target.value)}
                rules={{ required: true }}
                style={{margin:'0px', borderRight:'none',borderRadius:'4px 0px 0px 4px'}}
              />
              {mic? 
                    <FontAwesomeIcon className="col-1" style={{padding:"0px', ",border:" thin solid #1d8ff0",borderRadius:"4px",margin:'10px 0px' }} icon={faMicrophone} />
                      :
                    <FontAwesomeIcon onClick={MicClickOn}  className="col-1" style={{padding:"11px", margin:'10px 0px',border:" thin solid #cecece",height:'14px',borderLeft:'none', borderRadius:"0px 4px 4px 0px" }} icon={faMicrophoneSlash} />
              }
              </div>
            </InnerContainer>
            <InnerContainer>
              <Label>Type:</Label> &nbsp; <br />
                <Select options={crime_options} isMulti={false} 
                name="crime_type"
                type="select"
                // value={type}
                // onChange={(e)=>typeChange(e)}
                
                // rules={{ required: false }}
              />
            </InnerContainer>
          </TitleTypeContainer>
          <br />
          <InnerContainer>
          <Label>location:</Label> &nbsp; <br />
          <div style={{display:'flex', padding:'0px', alignItems:'center',margin:'-10px 0px', justifyContent:'space-around'}}>
                <Input 
                name="area"
                type="text"
                value={location}
                onChange={(e)=>onLChange(e.target.value) }
                autoComplete="off"
                placeholder="location"
                style={{margin:'0px', borderRight:'none',borderRadius:'4px 0px 0px 4px'}}
                rules={{ required: true }}
              />
              {mic2? 
                    <FontAwesomeIcon className="col-1" style={{padding:"0px', ",border:" thin solid #1d8ff0",borderRadius:"4px",margin:'10px 0px' }} icon={faMicrophone} />
                      :
                    <FontAwesomeIcon onClick={MicClickOn2}  className="col-1" style={{padding:"11px", margin:'10px 0px',border:" thin solid #cecece",height:'14px',borderLeft:'none', borderRadius:"0px 4px 4px 0px" }} icon={faMicrophoneSlash} />
              }
              </div>
              <br/>
              </InnerContainer>
              <TitleTypeContainer>
                <InnerContainer>
                  <Label>date:</Label> &nbsp; <br />
                <InputZIndexed 
                name="date"
                type="date"
                rules={{ required: true }}
              />
              </InnerContainer>
              <InnerContainer>
              <Label>Time:</Label> &nbsp; <br />
              <InputZIndexed 
                name="time"
                type="time"
                
                rules={{ required: true }}
              />
              </InnerContainer>
              </TitleTypeContainer>
         <br/>
          <Button
            color="warning"
            id="submit"
            type="submit"
          >
            submit
          </Button>{"  "}
          <Link to={"../laworder"}><Button color="warning">Back</Button></Link>
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

export default CrimeCreate;
