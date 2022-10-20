import React, { useState} from "react";
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
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import RichTextEditor from "../../../Commons/Editor";
import { initialNotesValue2 } from "../Constants";
import {
  CREATE_CALAMITY
} from "../LawOrderQueries";
import Select from "react-select";
import {
  ShadowBox,
  InputZIndexed,
  InnerContainer,
  TitleTypeContainer,
} from "../LawOrderStyled";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone,faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

function CalamityCreate() {
  // const { register, handleSubmit, control, watch, reset } = useForm();
  const [notes, setNotes] = useState(initialNotesValue2);

  const [createCalamity] = useMutation(CREATE_CALAMITY, {
    onError: (error) => {
      alert("Unsuccessful! Try Again!");
    },
    onCompleted: (data) => {
      if (data.createCalamity.success) {
        alert("Situation Added Successfully");
      } else {
        alert("Unsuccessful! Try Again!");
      }
    },
  });

  const convertObjectIntoValue = (data) => {
    data["type"] = data["type"]
    data["end_date"] = data["end_date"].split('-').reverse().join('-')
    data["start_date"] = data["start_date"].split('-').reverse().join('-')
    data["lessons_learnt"] = notes;
    return data
  }
  const onSubmit = (e) => {
    e.preventDefault();
    var object = {};
    
    const formData=new FormData(e.target);
    formData.forEach((value, key) => object[key] = value);
    
    console.log(object);
    object = convertObjectIntoValue(object);
    // createGathering({ variables: { gatheringData: JSON.stringify(object) } });
    
    createCalamity({ variables : {calamityData : JSON.stringify(object)}});
    e.target.reset();
    setVal('');
  }
  const calamity_options = [
    { value: "Earthquake", label: "Earthquake" },
    { value: "Floods", label: "Floods" },
    { value: "Drought", label: "Drought" },
    { value: "Landslide", label: "Landslide" },
    { value: "Forest Fire", label: "Forest Fire"},
    { value: "Cyclone", label: "Cyclone"},
    { value: "Storm", label: "Storm"},
    { value: "Other", label: "Other"}
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
    
    <form onSubmit={e=>(onSubmit(e))}>
      <Breadcrumb>
       <BreadcrumbItem>Law and Order</BreadcrumbItem>
       <BreadcrumbItem>Calamity</BreadcrumbItem>
       <BreadcrumbItem>Create</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col lg ="6">
          <h3>Basic Details</h3>
          <TitleTypeContainer>
            <InnerContainer>
              <Label>Title:</Label> &nbsp; <br />
              <div style={{display:'flex', width:'100%', padding:'0px', alignItems:'center',margin:'0px', justifyContent:'space-around'}}>
              <InputZIndexed 
                name="title"
                type="title"
                autoComplete="off"
                placeholder="Calamity"
                // 
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
            </InnerContainer>
            <InnerContainer>
              <Label>Type:</Label> &nbsp; <br />
              
              
                  <Select
                    options={calamity_options}
                    style={{ width: "95%" }}
                    isMulti={false}
                name="type"
                type="select"
                
                rules={{ required: true }}
              />
            </InnerContainer>
          </TitleTypeContainer>
          <br />
          <TitleTypeContainer>
            <div  style={{width: "30%"}}>
          <Label>Dead:</Label> &nbsp; <br />
          
          
              <Input
            name="dead"
            type="number"
            autoComplete="off"
            
            rules={{ required: false }}
          />
          </div>
          <div  style={{width: "30%"}}>
          <Label>Injured:</Label> &nbsp; <br />
          
          
              <Input
            name="injured"
            type="number"
            autoComplete="off"
            // 
            rules={{ required: false }}
          />
          </div>
          <div  style={{width: "30%"}}>
          <Label>People Affected:</Label> &nbsp; <br />
          
          
              <Input 
            name="people_affected"
            type="number"
            autoComplete="off"
            
            rules={{ required: false }}
          />
          </div>
          </TitleTypeContainer>
          <br/>
          <Label>Total Estimated Damages (Rs.):</Label> &nbsp; <br />
          
            <Input 
            type="number"
            name="total_cost"
            autoComplete="off"
            
            rules={{ required: false }}
          />
          <br />
          <TitleTypeContainer>
            <div style={{width: "45%"}}>
          <Label>Start Date</Label> &nbsp; <br />
          
            <Input 
            type="date"
            name="start_date"
            autoComplete="off"
            
            rules={{ required: false }}
          />
          </div>
          <div style={{width: "45%"}}>
          <Label>End Date</Label> &nbsp; <br />
          
            <Input 
            type="date"
            name="end_date"
            autoComplete="off"
            
            rules={{ required: false }}
          />
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
          <Label>NDRF Personnels:</Label> &nbsp; <br />
          
            <Input 
            name="ndrf"
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

export default CalamityCreate;
