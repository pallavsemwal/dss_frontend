import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import ButtonGroup from "@bootstrap-styled/v4/lib/ButtonGroup";
import { Modal, ModalHeader, ModalBody } from "@bootstrap-styled/v4";
import AddTagForm from "./Tags/AddTag";
import UpdateTagForm from "./Tags/UpdateTag";
import {
  GET_ALL_EVENTS_DURATION_EXCLUDE_ALL_DAY,
  GET_ALL_EVENTS_DURATION_ALL_DAY,
  DELETE_EVENT,
  UPDATE_EVENT,
  FORCE_UPDATE_EVENT,
} from "./Events/EventQueries";
import { useForm, Controller } from "react-hook-form";
import { Form } from "@bootstrap-styled/v4";
import { GET_ALL_TASKS_DURATION, DELETE_TASK } from "./Tasks/TaskQueries";
import { GET_ALL_TAGS, CREATE_TAG } from "./Tags/TagQueries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Button from "@bootstrap-styled/v4/lib/Button";
import EventModal from "./Events/EventModal";
import TagModal from "./Tags/TagModal";
import AddNotesModal from "./Notes/AddNotesModal";
import { parsePriorityColor, statusCode } from "./Constants";
import moment from "moment-timezone";
import { useToasts } from "react-toast-notifications"; // Notification Library
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const NavButton = styled.button`
  background-color: #fff;
  color: #999999;
  margin: 0px 2px;
  font-size: ${(props) => props.fs || "1.4em"};
  outline: 0px;
  border: 1px #eee solid;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  &:hover {
    border: 1px gray solid;
  }
`;

const Toolbar = styled.div`
  height: 3em;
  width: 100%;
  @media (max-width: 1200px) {
    height: 6em;
  }
`;

//Alert component
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

function ToastCalendar({
  curDate,
  setCurDate,
  UpdateUpcomingEventList,
  handleClose,
  children
}) {
  const [calendar, setCalender] = useState(null);
  const [modeView, setModeView] = useState("day");
  const [showNotes, setShowNotes] = useState(false);
  const [currNotesModalID, setCurrNotesModalID] = useState("");
  const [currNotesModalName, setCurrNotesModalName] = useState("");
  const [PreviousEventData, setPreviousEventData] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

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

  const [modal, setModal] = useState(false);
  const [ManageTags, setManageTags] = useState(false);
  const toggleSettings = () => setManageTags(!ManageTags);
  const toggleModal = () => {
    setModal(!modal);
    setManageTags(false);
  };

  const onSubmit = (data) => {
    console.log(data["tag_name"]);
    let m_data = data["tag_name"].split(",");
    console.log(m_data);
    for (var i = 0; i < m_data.length; i++) {
      data["tag_name"] = m_data[i];
      createTag({
        variables: { tagData: JSON.stringify(data) },
      });
    }
  };

  // NOtification setup
  const { addToast } = useToasts();

  // Queries

  const { data: tags, refetch: refetchTags } = useQuery(GET_ALL_TAGS);

  const { data: tasksData, refetch: fetchTasks } = useQuery(
    GET_ALL_TASKS_DURATION,
    {
      variables: {
        starttime: curDate.clone().startOf(modeView).format().slice(0, 10),
        endtime: curDate.clone().endOf(modeView).format().slice(0, 10),
      },
    }
  );

  const { data: eventsDataExcludeAllDay, refetch: fetchEventsExcludeAllDay } =
    useQuery(GET_ALL_EVENTS_DURATION_EXCLUDE_ALL_DAY, {
      variables: {
        starttime: curDate.clone().startOf(modeView).utc().format(),
        endtime: curDate.clone().endOf(modeView).utc().format(),
      },
    });

  const { data: eventsDataAllDay, refetch: fetchEventsAllDay } = useQuery(
    GET_ALL_EVENTS_DURATION_ALL_DAY,
    {
      variables: {
        starttime:
          curDate.clone().startOf(modeView).format().slice(0, 10) +
          "T00:00:00Z",
        endtime:
          curDate.clone().endOf(modeView).format().slice(0, 10) + "T23:59:00Z",
      },
    }
  );

  // Mutations

  const [deleteEvent] = useMutation(DELETE_EVENT, {
    onError: (error) => {
      console.log(error);
      addToast("Unsuccesful! Try again!", {
        appearance: "error",
        autoDismiss: true,
      });
    },
    onCompleted: (data) => {
      UpdateUpcomingEventList();
      addToast(`Event ${data.deleteEvent.name} Deleted Successfully!`, {
        appearance: "success",
        autoDismiss: true,
      });
    },
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    onError: (error) => {
      addToast("Unsuccesful! Try again!", {
        appearance: "error",
        autoDismiss: true,
      });
    },
    onCompleted: (data) => {
      addToast(`Task ${data.deleteTask.name} Deleted Successfully!`, {
        appearance: "success",
        autoDismiss: true,
      });
    },
  });

  const [forceUpdateEvent] = useMutation(FORCE_UPDATE_EVENT, {
    onError: (error) => {
      addToast("Unsuccesful! Try again!", {
        appearance: "error",
        autoDismiss: true,
      });
    },
    onCompleted: (data) => {
      if (data.forceUpdateEvent.success) {
        fetchEventsExcludeAllDay();
        fetchEventsAllDay();
        UpdateUpcomingEventList();
        calendar.updateSchedule(data.forceUpdateEvent.event.id, "1", {
          start: data.forceUpdateEvent.event.startDateTime,
          end: data.forceUpdateEvent.event.endDateTime,
        });
        addToast("Event timing updated Successfuly!!", {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast(data.forceUpdateEvent.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    },
  });

  const [updateEvent] = useMutation(UPDATE_EVENT, {
    onError: (error) => {
      addToast("Unsuccesful! Try again!", {
        appearance: "error",
        autoDismiss: true,
      });
    },
    onCompleted: (data) => {
      if (data.updateEvent.statusCode === statusCode.SUCCESS) {
        fetchEventsExcludeAllDay();
        fetchEventsAllDay();
        UpdateUpcomingEventList();
        calendar.updateSchedule(data.updateEvent.event.id, "1", {
          start: data.updateEvent.event.startDateTime,
          end: data.updateEvent.event.endDateTime,
        });
        addToast("Event timing updated Successfuly!!", {
          appearance: "success",
          autoDismiss: true,
        });
      } else if (data.updateEvent.statusCode === statusCode.FORBIDDEN) {
        const closeAlert = () => console.log("close");
        AlertBox(forceUpdateEvent, closeAlert, data.updateEvent);
      } else {
        addToast(data.updateEvent.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    },
  });

  // To Create Calender Object, This Effect Runs Once
  // Initilization of Calendar with Template Properties
  useEffect(() => {
    setCalender(
      new Calendar("#calendar", {
        defaultView: "week",
        taskView: true,
        template: {
          monthDayname: function (dayname) {
            return (
              '<span class="calendar-week-dayname-name">' +
              dayname.label +
              "</span>"
            );
          },
          popupDetailUser: function (schedule) {
            return "User : " + (schedule.attendees || []).join(", ");
          },
          popupIsAllDay: function () {
            return "All Day";
          },
        },
        useCreationPopup: false,
        useDetailPopup: true,
        month: {
          startDayOfWeek: 1,
        },
        week: {
          startDayOfWeek: 1,
        },
      })
    );
  }, []);

  useEffect(() => {
    if (calendar) {
      calendar.on({
        beforeUpdateSchedule: function (e) {
          if (
            e.triggerEventName !== undefined &&
            e.triggerEventName === "click"
          ) {
            if (e.schedule.category === "task") console.log("Task Clicked");
            else {
              // setCurrNotesModalID(e.schedule.id);
              // setCurrNotesModalName(e.schedule.title);
              // setShowNotes(true);
              console.log(e.schedule);
              setPreviousEventData(e.schedule);
              setShowEventModal(true);
            }
          } else {
            let event_update_variables = {};
            if (e.schedule.isAllDay) {
              event_update_variables = {
                id: e.schedule.id,
                starttime:
                  moment(new Date(e.start)).format().slice(0, 10) +
                  "T00:00:00Z",
                endtime:
                  moment(new Date(e.end)).format().slice(0, 10) + "T23:59:00Z",
              };
            } else {
              event_update_variables = {
                id: e.schedule.id,
                starttime: moment(new Date(e.start)).utc().format(),
                endtime: moment(new Date(e.end)).utc().format(),
              };
            }
            updateEvent({
              variables: {
                eventData: JSON.stringify(event_update_variables),
              },
            });
          }
        },
        beforeDeleteSchedule: (e) => {
          calendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);
          if (e.schedule.category === "task")
            deleteTask({ variables: { taskId: e.schedule.id } });
          else deleteEvent({ variables: { eventId: e.schedule.id } });
        },
      });
    }
  }, [calendar]);

  // Convert Schedule Event Required by the Calendar
  const getSchedule = (event) => {
    return {
      id: event["id"],
      calendarId: "1",
      category: "time",
      isAllDay: event["isAllDay"],
      title: event["eventName"],
      location: event["location"],
      bgColor: parsePriorityColor(event["priority"]),
      state: event["priority"],
      start: event["startDateTime"],
      end: event["endDateTime"],
    };
  };

  const getTasks = (task) => {
    return {
      id: task["id"],
      calendarId: "1",
      category: "task",
      title: task["taskName"],
      start: task["taskDate"],
    };
  };

  // Add Calender events/tasks on Data Change
  // useEffect Advantage: On Array(0) do not update
  // but might cause trouble in recurrent events
  useEffect(() => {
    if (
      calendar &&
      eventsDataExcludeAllDay !== undefined &&
      tasksData !== undefined &&
      eventsDataAllDay !== undefined
    ) {
      calendar.clear();
      let schedulesExcludeAllDay =
        eventsDataExcludeAllDay.eventsDurationExcludeAllDay.map((obj) =>
          getSchedule(obj)
        );
      let schedulesAllDay = eventsDataAllDay.eventsDurationAllDay.map((obj) =>
        getSchedule(obj)
      );
      let tasks = tasksData.tasksDuration.map((obj) => getTasks(obj));
      calendar.createSchedules(schedulesExcludeAllDay);
      calendar.createSchedules(schedulesAllDay);
      calendar.createSchedules(tasks);
    }
  }, [eventsDataExcludeAllDay, tasksData, eventsDataAllDay]);

  // Change Calender Date on curDate Change
  // CurDate change might be external/internal
  useEffect(() => {
    if (calendar) calendar.setDate(new Date(curDate.toString()));
    fetchEventsExcludeAllDay();
    fetchEventsAllDay();
    fetchTasks();
  }, [curDate]);

  const Prev = () => {
    if (modeView === "day") setCurDate(curDate.clone().subtract(1, "d"));
    if (modeView === "isoWeek") setCurDate(curDate.clone().subtract(1, "week"));
    if (modeView === "month") setCurDate(curDate.clone().subtract(1, "month"));
  };

  const Next = () => {
    if (modeView === "day") setCurDate(curDate.clone().add(1, "d"));
    if (modeView === "isoWeek") setCurDate(curDate.clone().add(1, "week"));
    if (modeView === "month") setCurDate(curDate.clone().add(1, "month"));
  };

  const setView = (modeView) => {
    setModeView(modeView);
    if (modeView === "isoWeek") {
      calendar.changeView("week", true);
    } else {
      calendar.changeView(modeView, true);
    }
    fetchEventsExcludeAllDay();
    fetchEventsAllDay();
    fetchTasks();
  };

  const handleAddEvent = () => {
    setPreviousEventData(undefined);
    setShowEventModal(true);
  };

  return (
    <div >
      <Toolbar>
        <ButtonGroup>
          <Button
            color="primary"
            size="sm"
            onClick={handleAddEvent}
            style={{ marginRight: "7px", boxSizing: "border-box" }}
          >
            &nbsp;<strong>+ Event</strong>&nbsp;
          </Button>
          {/* <AddTaskModel refreshCalender={fetchTasks}>
            <Button color="primary" size="sm">
              &nbsp;<strong>+ Task</strong>&nbsp;
            </Button>
          </AddTaskModel> */}

          <TagModal refetchTags={refetchTags} tags={tags}>
            <Button color="primary" size="sm">
              &nbsp;<strong>+ Tag</strong>&nbsp;
            </Button>
          </TagModal>

          <AddNotesModal
            eventId={currNotesModalID}
            eventName={currNotesModalName}
            showNotes={showNotes}
            setShowNotes={setShowNotes}
          />
          <EventModal
            refreshCalenderExcludeAllDay={fetchEventsExcludeAllDay}
            refreshCalenderAllDay={fetchEventsAllDay}
            tags={tags}
            UpdateUpcomingEventList={UpdateUpcomingEventList}
            PreviousEventData={PreviousEventData}
            showEventModal={showEventModal}
            setShowEventModal={setShowEventModal}
          />
        </ButtonGroup>
        <span style={{ float: "right", margin: "8px" }}>
          <ButtonGroup>
            <Button color="secondary" onClick={() => setView("day")}>
              &nbsp;Day&nbsp;
            </Button>
            <Button color="secondary" onClick={() => setView("isoWeek")}>
              &nbsp;Week&nbsp;
            </Button>
            <Button color="secondary" onClick={() => setView("month")}>
              &nbsp;Month&nbsp;
            </Button>
          </ButtonGroup>
          <span style={{ margin: "4px", whiteSpace: "nowrap" }}>
            <NavButton onClick={Prev}>&#8249;</NavButton>
            <NavButton onClick={Next}>&#8250; </NavButton>
          </span>
        </span>
      </Toolbar>
      <div id="calendar" style={{ height: "90vh", minHeight: "600px" }}></div>
    </div>
  );
}

export default ToastCalendar;