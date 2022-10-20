import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { useMutation } from "@apollo/react-hooks";

import 'bootstrap/dist/css/bootstrap.min.css';
// import FormFeedback from 'reactstrap';
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
  Option,
} from "@bootstrap-styled/v4";
import {
  COMPLETE_UPDATE_EVENT,
  CREATE_EVENT,
  FORCE_CREATE_EVENT,
  FORCE_COMPLETE_UPDATE_EVENT,
} from "./EventQueries";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { statusCode } from "../Constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone,faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'
//Alert Component
// import './EventModal.css';
const AlertBox = (Yes, No, data) => {
  confirmAlert({
    title: "Overlapping Timings",
    message: data.message,
    buttons: [
      {
        label: "Yes",
        onClick: () => Yes({ variables: { eventData: data.eventdata } }),
      },
      {
        label: "No",
        onClick: () => No(),
      },
    ],
  });
};

const convertTimeToInputTagFormat = (timeString) => {
  let hrs = timeString.getHours() % 24;
  let mins = timeString.getMinutes();
  return [(hrs > 9 ? "" : "0") + hrs, (mins > 9 ? "" : "0") + mins].join(":");
};

const convertDateToInputTagFormat = (dateString) => {
  const yyyy = dateString.getFullYear();
  const mm = dateString.getMonth() + 1;
  const dd = dateString.getDate();
  return [yyyy, (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("-");
};

const get1HourLater = () => {
  let DateTime = new Date();
  DateTime.setHours(DateTime.getHours() + 1);
  return convertTimeToInputTagFormat(DateTime);
};

const getOptions = (opList, key) => {
  if (opList && opList[key]) {
    return opList[key].map((val) => {
      return { value: val["id"], label: val["name"] };
    });
  }
};

function EventModal({
  refreshCalenderExcludeAllDay,
  refreshCalenderAllDay,
  tags,
  UpdateUpcomingEventList,
  PreviousEventData,
  showEventModal,
  setShowEventModal,
}) {
  const [allDay, setAllDay] = useState(false);

  useEffect(() => {
    setAllDay(PreviousEventData ? PreviousEventData.isAllDay : false);
  }, [PreviousEventData]);

  const handleClose = () => {
    setShowEventModal(!showEventModal);
    setAllDay(false);
  };

  const { addToast } = useToasts();

  const [forceCompleteUpdateEvent] = useMutation(FORCE_COMPLETE_UPDATE_EVENT, {
    onError: (error) => {
      addToast("Unsuccessful! Try Again!", {
        appearance: "error",
        autoDismiss: true,
      });
    },
    onCompleted: (data) => {
      if (data.forceCompleteUpdateEvent.success) {
        setDefault();
        UpdateUpcomingEventList();
        addToast(data.forceCompleteUpdateEvent.message, {
          appearance: "success",
          autoDismiss: true,
        });
        refreshCalenderExcludeAllDay();
        refreshCalenderAllDay();
      } else {
        addToast(data.forceCompleteUpdateEvent.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    },
  });

  const [completeUpdateEvent] = useMutation(COMPLETE_UPDATE_EVENT, {
    onError: (error) => {
      addToast("Unsuccessful! Try Again!", {
        appearance: "error",
        autoDismiss: true,
      });
    },
    onCompleted: (data) => {
      if (data.completeUpdateEvent.statusCode === statusCode.SUCCESS) {
        setDefault();
        UpdateUpcomingEventList();
        handleClose();
        addToast(data.completeUpdateEvent.message, {
          appearance: "success",
          autoDismiss: true,
        });
        refreshCalenderExcludeAllDay();
        refreshCalenderAllDay();
      } else if (data.completeUpdateEvent.statusCode === statusCode.FORBIDDEN) {
        handleClose();
        AlertBox(
          forceCompleteUpdateEvent,
          handleClose,
          data.completeUpdateEvent
        );
      } else {
        addToast(data.completeUpdateEvent.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    },
  });
  const [forceCreateEvent] = useMutation(FORCE_CREATE_EVENT, {
    onError: (error) => {
      addToast("Unsuccessful! Try Again!", {
        appearance: "error",
        autoDismiss: true,
      });
    },

    onCompleted: (data) => {
      if (data.forceCreateEvent.success) {
        setDefault();
        UpdateUpcomingEventList();
        addToast(data.forceCreateEvent.message, {
          appearance: "success",
          autoDismiss: true,
        });
        refreshCalenderExcludeAllDay();
        refreshCalenderAllDay();
      } else {
        addToast(data.forceCreateEvent.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    },
  });

  const [createEvent] = useMutation(CREATE_EVENT, {
    onError: (error) => {
      addToast("Unsuccessful! Try Again!", {
        appearance: "error",
        autoDismiss: true,
      });
    },
    onCompleted: (data) => {
      if (data.createEvent.statusCode === statusCode.SUCCESS) {
        setDefault();
        
        UpdateUpcomingEventList();
        handleClose();
        addToast(data.createEvent.message, {
          appearance: "success",
          autoDismiss: true,
        });
        refreshCalenderExcludeAllDay();
        refreshCalenderAllDay();
      } else if (data.createEvent.statusCode === statusCode.FORBIDDEN) {
        handleClose();
        AlertBox(forceCreateEvent, handleClose, data.createEvent);
      } else {
        addToast(data.createEvent.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    },
  });

  const convertFormToQueryObj = (data) => {
    // console.log(data["is_all_day"]);
    data["is_all_day"] = allDay;
    // console.log(data['tags']);
    // data["tags"] = data["tags"]?.map((obj) => obj["value"]) || [];

    if (!allDay) {
      data["start_date"] = moment(
        data["start_date"] + "-" + data["start_time"],
        "YYYY-MM-DD-hh-mm"
      )
        .utc()
        .format();
      data["end_date"] = moment(
        data["end_date"] + "-" + data["end_time"],
        "YYYY-MM-DD-hh-mm"
      )
        .utc()
        .format();
    } else {
      data["start_date"] = moment(
        data["start_date"] + "-00:00 +0000",
        "YYYY-MM-DD-hh-mm Z"
      )
        .utc()
        .format();
      data["end_date"] = moment(
        data["end_date"] + "-23:59 +0000",
        "YYYY-MM-DD-hh-mm Z"
      )
        .utc()
        .format();
    }

    if (PreviousEventData) data["id"] = PreviousEventData.id;
    return data;
  };

  const onSubmit = (data) => {
    data = convertFormToQueryObj(data);
    console.log(data);
    
    if (data['start_date'] < data['end_date'] && eventTitle.trim().length!=0 && svenue.trim().length!=0) {
      if (PreviousEventData) {
        completeUpdateEvent({ variables: { eventData: JSON.stringify(data) } });
      } else {
        createEvent({ variables: { eventData: JSON.stringify(data) } });
      }
    } 
    else if(eventTitle.trim().length==0){
      alert("Event Name Must Not be empty");
    }
    else if(svenue.trim().length==0){
      alert("Venue Must Not be empty");
    }
    else {
      alert("End Datetime should be after Start Datetime");
    }
  };
  // const validate()
  // const getDefaultValues = () => {
  //   if (PreviousEventData) {
  //     let prevEvent_StartTime = PreviousEventData?.start._date || new Date();
  //     let prevEvent_EndTime = PreviousEventData?.end._date || new Date();
  //     let prevEvent_StartDate = PreviousEventData?.start._date || new Date();
  //     let prevEvent_EndDate = PreviousEventData?.end._date || new Date();
  //     return {
  //       event_name: PreviousEventData?.title,
  //       is_all_day: PreviousEventData?.isAllDay || false,
  //       start_date: convertDateToInputTagFormat(prevEvent_StartDate),
  //       start_time: convertTimeToInputTagFormat(prevEvent_StartTime),
  //       end_date: convertDateToInputTagFormat(prevEvent_EndDate),
  //       end_time: convertTimeToInputTagFormat(prevEvent_EndTime),
  //       venue: PreviousEventData?.location,
  //       priority: PreviousEventData?.state.slice(2, 3) || "2",
  //     };
  //   } else {
  //     return {
  //       event_name: "",
  //       is_all_day: false,
  //       start_date: convertDateToInputTagFormat(new Date()),
  //       start_time: convertTimeToInputTagFormat(new Date()),
  //       end_date: convertDateToInputTagFormat(new Date()),
  //       end_time: get1HourLater(),
  //       venue: "",
  //       priority: "2",
  //     };
  //   }
  // };

  // const {register,handleSubmit, control, reset } = useForm({
  //   defaultValues: getDefaultValues(),
  // });

  // useEffect(() => reset(getDefaultValues()), [showEventModal]);



  // console.log(new Date());
  const [eventTitle,setVal]= useState("");
  const [mic,setMic]= useState(false);
  const [mic2,setMic2]= useState(false);
  const [startDate,setStartDate]=useState((convertDateToInputTagFormat(new Date())));
  const [startTime,setStartTime]=useState((convertTimeToInputTagFormat(new Date())));
  const [endDate,setEndDate]=useState((convertDateToInputTagFormat(new Date())));
  const [endTime,setEndTime]=useState(get1HourLater());
  const[svenue,setVenue]=useState("");
  const[touchEventTitle,setTouchEventTitle]=useState(false);
  const[touchStartDate,setTouchStartDate]=useState(false);
  const[touchEndDate,setTouchEndDate]=useState(false);
  const[touchStartTime,setTouchStartTime]=useState(false);
  const[touchEndTime,setTouchEndTime]=useState(false);
  const[touchVenue,setTouchVenue]=useState(false);


  const setDefault=()=>{
    setVal("");
    setStartDate((convertDateToInputTagFormat(new Date())));
    setEndDate((convertDateToInputTagFormat(new Date())));
    setStartTime(convertTimeToInputTagFormat(new Date()));
    setEndTime(get1HourLater());
    setVenue("");
    setTouchEventTitle(false);
    setTouchStartDate(false);
    setTouchEndDate(false);
    setTouchStartTime(false);
    setTouchEndTime(false)
    setTouchVenue(false);
  }

  const eventTitleChange =(e)=>{
    var val=e.trimStart();
    setVal(val);
    // console.log({eventTitle});
    // setVal(val.concat(" ").concat(transcript));
  }
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  const MicClickOn=()=>{
    setMic(true);
    recognition.start();;
    // console.log({eventTitle});
  }
  
  recognition.onaudioend = function() {
    // console.log('Audio capturing ended');
    setMic(false);
  }
  recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
      console.log('No speech was detected. Try again.');  
    };
  }
  recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    // console.log(transcript);
    setVal(eventTitle.concat(" ").concat(transcript));
  }
  const onClickOff=()=>{
    recognition.stop();
    setMic(false);
  }

  var recognition2 = new SpeechRecognition();
  const MicClickOn2=()=>{
    setMic2(true);
    recognition2.start();;
    // console.log({eventTitle});
  }
  
  recognition2.onaudioend = function() {
    // console.log('Audio capturing ended');
    setMic2(false);
  }
  recognition2.onerror = function(event) {
    if(event.error == 'no-speech') {
      // console.log('No speech was detected. Try again.');  
    };
  }
  recognition2.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    // console.log(transcript);
    setVenue(svenue.concat(" ").concat(transcript));
  }
  const onClickOff2=()=>{
    recognition2.stop();
    setMic2(false);
  }




  const trySubmit=(e)=>{

    e.preventDefault();
    var object = {};
    
    const formData=new FormData(e.target);
    formData.forEach((value, key) => object[key] = value);
    // console.log(formData.values);
    onSubmit(object);
    
  }
  const validate=()=>{
    const errors= {
      eventTitle:'',
      Date:'',
      Time:'',
      venue:'',
    }
    if(touchEventTitle && eventTitle.trim().length==0){
      errors.eventTitle='Must not be empty';
    }
    if((touchStartDate || touchEndDate) && startDate>endDate){
      errors.Date='Start Date Must be before End Date';
    }
    if((touchStartTime || touchEndTime) && startTime>endTime){
      errors.Time='Start Time Must be before End Time';
    }
    if(touchVenue && svenue.length==0){
      errors.venue='Must not be empty';
    }
    return errors;
  }
  const handleBlur=(e)=>{
    // console.log('inside blur');
    if(e.target.name=='event_name'){
      setTouchEventTitle(true);
    }
    else if(e.target.name=='start_date'){
      setTouchStartDate(true);
    }
    else if(e.target.name=='end_date'){
      setTouchEndDate(true);
    }
    else if(e.target.name=='end_time'){
      setTouchEndTime(true); 
    }
    else if(e.target.name=='start_time'){
      setTouchStartTime(true); 
    }
    else if(e.target.name=='venue'){
      var val=e.target.value.trimStart();
      setVenue(val);
      // console.log({eventTitle});
      setTouchVenue(true); 
    }
  }
  const handleMyChange=(e)=>{
    if(e.target.name=='start_date'){
      setStartDate(e.target.value);
    }
    else if(e.target.name=='end_date'){
      setEndDate(e.target.value);
    }
    else if(e.target.name=='end_time'){
      setEndTime(e.target.value); 
    }
    else if(e.target.name=='start_time'){
      setStartTime(e.target.value); 
    }
    else if(e.target.name=='venue'){
      
      setVenue(e.target.value); 
    }
  }
  const errors=validate();
  console.log(errors);

  const priority_options = [
    { value: '1', label: "Low" },
    { value: '2', label: "Normal" },
    { value: '3', label: "High" }
  ];
  // const { onChang, onBlur, name, ref } = register('firstName');
  // const { onChange, onBlur, name, ref } = register('firstName');
  return (
    <span>
      {/* <input type='text' {...register('firstname')}/> */}
      <Modal isOpen={showEventModal} toggle={() => handleClose()}>
        <ModalHeader>{PreviousEventData ? "Update" : "Add"} Event</ModalHeader>
        <ModalBody className="container">
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <form  onSubmit={(e)=>trySubmit(e)}>
            <label for='event_name'>Event Title:</label>
            <br/>
            <div className="row">
            <input onBlur={handleBlur} className=" form-control" style={{margin:'10px 0px 10px 10px',padding:'6px',width:"84%", borderRadius:'4px 0px 0px 4px',borderRight:'none'}}  value={eventTitle} onChange={(e)=>{eventTitleChange(e.target.value)}} name="event_name"  id="event_name" placeholder="Enter title of the event e.g. Visit Office" />
            {mic? 
                    <FontAwesomeIcon className="col-1" style={{padding:"11px 15px",border:" thin solid #1d8ff0",  margin:'10px 0px',borderRadius:"0px 4px 4px 0px ",width:'17px',borderLeft:'none' }} icon={faMicrophone} />
                      :
                    <FontAwesomeIcon onClick={MicClickOn}  className="col-1" style={{padding:"11px", margin:'10px 0px',border:" thin solid #cecece", borderRadius:"0px 4px 4px 0px",width:'25px', borderLeft:'none' }} icon={faMicrophoneSlash} />
            }
            <p style={{margin:"0px",color:'red',fontSize:"13px"}}>{errors.eventTitle}</p>
            </div>
            <label className='form-check-label'>All Day</label>
            <input name="is_all_day" style={{ width: "10%", height: "16px" }} type="checkbox" value={allDay} onChange={() => setAllDay(!allDay)}/>
            <br/>
            {!allDay?
            <>
            <label style={{margin:'10px 0 '}} className="col-6">Start Date:</label>
            <label className='form-label' >Start Time:</label>
            <br/>
            <div style={{padding:'0px',margin:'0px -10px -20px -10px'}} className=" row">
            <input onBlur={handleBlur} value={startDate} onChange={handleMyChange} name="start_date" className='form-control  ' style={{margin:'0px 0px 0px 10px',width:"45%"}} value={startDate}   type="date" />
            <input onBlur={handleBlur} value={startTime} onChange={handleMyChange} name="start_time" className="form-control col" style={{margin:'0px 15px 0px 15px',width:"30%"}}   type="time" />
            <div className='row'>
            <p className="col-sm-6"  style={{color:'red' ,fontSize:'13px'}}>{errors.Date}</p>
            <p className="col-sm-6" style={{color:'red',fontSize:'13px'}}>{errors.Time}</p>
            </div>
            </div>
            <label style={{margin:'10px 0 '}} className="col-6" >End Date:</label>
            <label className='form-label' for="end_time" >End Time:</label>
            <br/>
            
            <div style={{padding:'0px',margin:'-10px -10px -20px -10px'}} className=" row">
            <input onBlur={handleBlur} onChange={handleMyChange} value={endDate} name="end_date" id="end_date" className="form-control " style={{margin:'0px 0px 0px 10px',width:"45%"}}  type="date" />
            <input onBlur={handleBlur} onChange={handleMyChange} value={endTime} className="form-control col" style={{margin:'0px 15px 0px 15px',width:"30%"}} id="end_time" name="end_time" type="time" />
            </div>
            </>
            :
            <>
            <label style={{margin:'10px 0 '}} className="col-6">Start Date:</label>
            <label className="col-6" >End Date:</label>
            <br/>
            <div style={{padding:'0px',margin:'-10px -10px -20px -10px'}} className=" row">
            {/* <div style={{padding:'0px',margin:'-10px -10px -40px -10px'}} className=" row"> */}
            <input onBlur={handleBlur} value={startDate} onChange={handleMyChange} name="start_date" className="form-control " style={{margin:'10px 0px 0px 10px',width:"45%"}} value={startDate}   type="date" />
            
            {/* <br/> */}
            {/* <label className="col-6" >End Date:</label> */}
            {/* <label className='form-label' for="end_time" style={{margin:'10px 10px 0px 10px'}}>End Time:</label> */}
            {/* <br/> */}
            <input onBlur={handleBlur} onChange={handleMyChange} value={endDate} name="end_date" id="end_date" className="form-control col" style={{margin:'10px 15px 0px 15px',width:"30%"}}  type="date" />
            <p className="col-sm-6"  style={{color:'red' ,fontSize:'13px'}}>{errors.Date}</p>
            </div>
            {/* </div> */}
            </>
            }
            
            {/* <br/>
            <label className="col-6" >End Date:</label>
            <label className='form-label' for="end_time" style={{margin:'10px 10px 0px 10px'}}>End Time:</label>
            <br/>
            <div className="form-group row">
            <input onBlur={handleBlur} onChange={handleMyChange} value={endDate} name="end_date" id="end_date" className="form-control col" style={{margin:'10px'}}  type="date" />
            <input onBlur={handleBlur} onChange={handleMyChange} value={endTime} className="form-control col" style={{margin:'10px'}} id="end_time" name="end_time" type="time" />
            </div> */}
            <br/>
            <label>Venue:</label>
            <div style={{display:'flex'}}>
            <input onChange={handleMyChange} onBlur={handleBlur} value ={svenue} className="form-control" name="venue" type="text"  placeholder="E.g. Conference Room" style={{margin:'10px 0px 10px 0px',padding:'6px',width:"88%",borderRadius:'4px 0px 0px 4px',borderRight:'none'}}/>
            {mic2? 
                    <FontAwesomeIcon className="col-1" style={{padding:"11px 15px",border:" thin solid #1d8ff0",  margin:'10px 0px',borderRadius:"0px 4px 4px 0px ",width:'17px',borderLeft:'none' }} icon={faMicrophone} />
                      :
                    <FontAwesomeIcon onClick={MicClickOn2}  className="col-1" style={{padding:"11px",width:'25px', margin:'10px 0px',border:" thin solid #cecece", borderRadius:"0px 4px 4px 0px ",borderLeft:'none'}} icon={faMicrophoneSlash} />
            }
            </div>
            <p style={{margin:"0px",color:'red',fontSize:"13px"}}>{errors.venue}</p>
            <Label>Tags:</Label> &nbsp; <br />
            {/* <input  type="select" name="tags" options={getOptions(tags, "allTags")} style={{ width: "100%" }} isMulti={true} /> */}
            <Select name="tags" options={getOptions(tags, "allTags")} style={{ width: "100%" }} isMulti={true}/>

            <Label style={{margin:'10px'}}>Select Priority:</Label> &nbsp; <br />
            <Select name="priority" type="select" style={{margin:"0px 0px 15px 0px"}}  options={priority_options}/>
            <Button color="primary" type="submit" style={{margin:'10px'}}>
              Submit
            </Button>{" "}
            &nbsp;
            <Button color="secondary" onClick={() => handleClose()}>
              Cancel
            </Button>
          </form>
          {/* {listening? <p>on</p> : <p>off</p>} */}
          {/* <Form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('firstname')} name="firstName"/>
            <Label>Event Title:</Label> &nbsp; <br />
            <Controller
              as={
              // <div style={{display:"flex"}}>
                    <Input   onChange={(e)=>{eventTitleChange(e.target.value)}} style={{ width: "85%" }}/>
                  }
              name="event_name"
              type="text"
              autoComplete="off"
              placeholder="Enter title of the event e.g. Visit Office"
              control={control}
              rules={{ required: true }}
            />
            {/* <Input type= {...register("event_name",{required:true})} />  */}
            

            {/* <Controller
              control={control}
              name="event_name"
              type="text"
              as={<div>
                <Input 
              </div>}
              // render={({
              //   field: { onChange, onBlur, value, name, ref },
              //   fieldState: { invalid, isTouched, isDirty, error },
              //   formState,
              // }) => (
              //   <Input style={{ width: "85%" }} />
              // )}
            /> */}
            {/* <input {...register} */}
            
            {/* <br />
            <Label>All Day</Label> &nbsp; &nbsp;
            <Controller
              as={<Input style={{ width: "10%", height: "16px" }} />}
              name="is_all_day"
              type="checkbox"
              onChange={() => setAllDay(!allDay)}
              control={control}
            />
            <br />
            <Row>
              <Col>
                <Label>Start Date:</Label> &nbsp; <br />
                <Controller
                  as={<Input />}
                  name="start_date"
                  type="date"
                  control={control}
                  rules={{ required: true }}
                />
              </Col>
              {!allDay && (
                <Col>
                  <Label>Start Time:</Label> &nbsp; <br />
                  <Controller
                    as={<Input style={{ width: "95%" }} />}
                    name="start_time"
                    type="time"
                    control={control}
                  />
                </Col>
              )}
              <Col>
                <Label>End Date:</Label> &nbsp; <br />
                <Controller
                  as={<Input />}
                  name="end_date"
                  type="date"
                  control={control}
                  rules={{ required: true }}
                />
              </Col>
              {!allDay && (
                <Col>
                  <Label>End Time:</Label> &nbsp; <br />
                  <Controller
                    as={<Input style={{ width: "95%" }} />}
                    name="end_time"
                    type="time"
                    control={control}
                  />
                </Col>
              )}
            </Row>
            <br />
            <Label>Venue:</Label> &nbsp; <br />
            <Controller
              as={<Input style={{ width: "95%" }} />}
              name="venue"
              type="text"
              placeholder="E.g. Conference Room"
              control={control}
              rules={{ required: true }}
            />
            <br />
            <Label>Tags:</Label> &nbsp; <br />
            <Controller
              as={
                <Select
                  options={getOptions(tags, "allTags")}
                  style={{ width: "100%" }}
                  isMulti={true}
                />
              }
              type="select"
              name="tags"
              control={control}
            />
            <br />
            <Label>Select Priority:</Label> &nbsp; <br />
            <Controller
              as={
                <Input style={{ width: "95%" }}>
                  <Option value="1">Low</Option>
                  <Option value="2">Normal</Option>
                  <Option value="3">High</Option>
                </Input>
              }
              name="priority"
              type="select"
              control={control}
              rules={{ required: true }}
            />
            <br />
            <Button color="primary" type="submit">
              Submit
            </Button>{" "}
            &nbsp;
            // 
          </Form> */}
        </ModalBody>
      </Modal>
    </span>
  );
}

export default EventModal;
