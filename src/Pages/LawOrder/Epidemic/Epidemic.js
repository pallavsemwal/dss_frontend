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
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import RichTextEditor from "../../../Commons/Editor";
import { initialNotesValue2 } from "../Constants";
import {
  CREATE_EPIDEMIC
} from "../LawOrderQueries";
import Select from "react-select";
import {
  ShadowBox,
  InputZIndexed,
  TitleTypeContainer,
  InnerContainer,
} from "../LawOrderStyled";
import { Link } from "react-router-dom";
import {EpidemicView} from './View';
import {Epidemic} from './Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone,faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

function EpidemicCreate() {
  const { register, handleSubmit, control, watch, reset } = useForm();
  const [notes, setNotes] = useState(initialNotesValue2);

  const [createEpidemic] = useMutation(CREATE_EPIDEMIC, {
    onError: (error) => {
      alert("Unsuccessful! Try Again!");
    },
    onCompleted: (data) => {
      if (data.createEpidemic.success) {
        alert("Situation Added Successfully");
      } else {
        alert("Unsuccessful! Try Again!");
      }
    },
  });


  const convertDataIntoObject = (data) => {
    var type = ""
    // console.log(data.type.type);
    data.type.type.forEach(element => { type = type + element + ", "
      
    });
    data["type"] = type
    data["year"] = data["year"] + "-01"
    data["year"] = data["year"].split("-").reverse().join("-")
    data["lessons_learnt"] = notes;
    return data
  }
  const onSubmit = (e) => {
    e.preventDefault();
    var object = {};
    
    const formData=new FormData(e.target);
    formData.forEach((value, key) =>{
      if(key=='type'){
        object[key]={type};
        console.log('inside_i')
      } 
      else{
        object[key] = value;
      }
      
      });
    
    console.log(object['type']);
    console.log(object);
    if(object['title']!=''){
      const data = convertDataIntoObject(object);
      createEpidemic({variables : {epidemicData: JSON.stringify(data)}});
    }
    else{
      alert("Please Enter Pandmic Name")
    }


    // data.preventDefault();
    // data = convertDataIntoObject(data);
    // console.log(data)
    // createEpidemic({variables : {epidemicData: JSON.stringify(data)}});
    // data.target.reset();
  };

  const epidemic_options = [
    { value: "Highly Infectious", label: "Highly Infectious" },
    { value: "Deadly", label: "Deadly" },
    { value: "Seasonal", label: "Seasonal" }
  ];
  const [eventTitle,setVal]= useState("");
  const [mic,setMic]= useState(false);
  const [type,setType]=useState([]);
  

  const typeChange=(e)=>{
    var types= [];
    // types.push(e.target.value);
    // setType(types);
    if(e==null){
      console.log('inside null');
      setType([]);
    }
    else{
      e.forEach(element => {
          types.push(element.value);
      });  
      setType(types);
    }
    console.log(type);
    
    // console.log(e);
    // console.log(types);
    
  }

  const eventTitleChange =(e)=>{
    var val=e.trimStart();
    setVal(val);
    console.log({eventTitle});
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

  return (
    <form onSubmit={onSubmit}>
      <Breadcrumb>
       <BreadcrumbItem>Law and Order</BreadcrumbItem>
       <BreadcrumbItem>Epidemic</BreadcrumbItem>
       <BreadcrumbItem>Create</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col lg="6">
          <h3>Basic Details</h3>
          <TitleTypeContainer>
            <InnerContainer>
              <Label>Title:</Label> &nbsp; <br />
              <div style={{display:'flex', padding:'0px', alignItems:'center',margin:'-10px', justifyContent:'space-around'}}>
              <Input
                name="title"
                type="text"
                autoComplete="off"
                placeholder="Epidemic"
                control={control}
                value={eventTitle}
                onChange={(e)=>eventTitleChange(e.target.value)}
                rules={{ required: true }}
                style={{margin:'0px', borderRight:'none',borderRadius:'4px 0px 0px 4px'}}
              />
              {mic? 
                    <FontAwesomeIcon className="col-1" style={{padding:"0px', ",border:" thin solid #1d8ff0",borderRadius:"4px",margin:'10px 0px' }} icon={faMicrophone} />
                      :
                    <FontAwesomeIcon onClick={MicClickOn}  className="col-1" style={{padding:"11px", margin:'10px 0px',border:" thin solid #cecece",height:'14px',borderLeft:'none', borderRadius:"0px 4px 4px 0px" }} icon={faMicrophoneSlash} />
              }
              </div>
              <br />
            </InnerContainer>
            <InnerContainer>
              <Label>Type:</Label> &nbsp; <br />
              <Select options={epidemic_options} isMulti={true}
                name="type"
                type="select"
                // control={control}
                value={type}
                onChange={setType}
                rules={{ required: false }}
              />
              <br />
            </InnerContainer>
          </TitleTypeContainer>
          <TitleTypeContainer>
            <div  style={{width: "30%"}}>
          <Label>Total Infected:</Label> &nbsp; <br />
          <Controller
            as={
              <Input/>
            }
            name="total_infected"
            type="number"
            autoComplete="off"
            control={control}
            rules={{ required: false }}
          />
          </div>
          <div  style={{width: "30%"}}>
          <Label>Cured:</Label> &nbsp; <br />
          <Controller
            as={
              <Input/>
            }
            name="cured"
            type="number"
            autoComplete="off"
            control={control}
            rules={{ required: false }}
          />
          </div>
          <div  style={{width: "30%"}}>
          <Label>Deaths</Label> &nbsp; <br />
          <Controller
            as={
              <Input />
            }
            name="died"
            type="number"
            autoComplete="off"
            control={control}
            rules={{ required: false }}
          />
          </div>
          </TitleTypeContainer>
          <br/>
          <Label>Month and Year</Label> &nbsp; <br />
          <Controller
            as={
              <Input style={{width: "50%"}}/>
            }
            name="year"
            type="month"
            autoComplete="off"
            control={control}
            rules={{ required: true }}
          />
          <br/>
          <h3>Resource Allocation:</h3>
          <TitleTypeContainer>
            
          <div style={{width: "30%"}}>
          <Label>Police Personnels:</Label> &nbsp; <br />
          <Controller
            as={<Input />}
            name="police"
            type="number"
            autoComplete="off"
            control={control}
            rules={{required: true}}
          /></div>
           <div style={{width: "30%"}}>
          <Label>Hospital Beds:</Label> &nbsp; <br />
          <Controller
            as={<Input />}
            name="hospitalbeds"
            type="number"
            autoComplete="off"
            control={control}
            rules={{required: true}}
          /></div>
           <div style={{width: "30%"}}>
          <Label>Health Staff:</Label> &nbsp; <br />
          <Controller
            as={<Input />}
            name="healthstaff"
            type="number"
            autoComplete="off"
            control={control}
            rules={{required: true}}
          /></div>
           <div style={{width: "30%"}}>
          <Label>Others:</Label> &nbsp; <br />
          <Controller
            as={<Input />}
            name="others"
            type="number"
            autoComplete="off"
            control={control}
            rules={{required: true}}
          /></div>
          </TitleTypeContainer>
          <br/>
          <Button
            color="warning"
            id="search"
            type="submit"
          >
            Submit
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

export default EpidemicCreate;
