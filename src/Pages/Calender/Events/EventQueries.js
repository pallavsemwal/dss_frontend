import { gql } from "apollo-boost";

const CREATE_EVENT = gql`
  mutation CreateEvent($eventData: JSONString!) {
    createEvent(eventData: $eventData) {
      statusCode
      message
      eventdata
    }
  }
`;

const FORCE_CREATE_EVENT = gql`
  mutation ForceCreateEvent($eventData: JSONString!) {
    forceCreateEvent(eventData: $eventData) {
      success
      message
    }
  }
`;

const GET_ALL_EVENTS = gql`
  query allEvents {
    allEvents {
      id
      eventName
      isAllDay
    }
  }
`;

const GET_ALL_EVENTS_DURATION_EXCLUDE_ALL_DAY = gql`
  query eventsDurationExcludeAllDay($starttime: String, $endtime: String) {
    eventsDurationExcludeAllDay(starttime: $starttime, endtime: $endtime) {
      id
      eventName
      isAllDay
      startDateTime
      endDateTime
      location
      priority
    }
  }
`;

const GET_ALL_EVENTS_DURATION_ALL_DAY = gql`
  query eventsDurationAllDay($starttime: String, $endtime: String) {
    eventsDurationAllDay(starttime: $starttime, endtime: $endtime) {
      id
      eventName
      isAllDay
      startDateTime
      endDateTime
      location
      priority
    }
  }
`;

const GET_UPCOMING_EVENTS = gql`
  query eventsUpcoming($curtime: String) {
    eventsUpcoming(curtime: $curtime) {
      id
      eventName
      startDateTime
      endDateTime
      isAllDay
      location
      priority
    }
  }
`;

const DELETE_EVENT = gql`
  mutation DeleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId) {
      name
    }
  }
`;

const UPDATE_EVENT = gql`
  mutation UpdateEvent($eventData: JSONString!) {
    updateEvent(eventData: $eventData) {
      statusCode
      message
      event {
        id
        startDateTime
        endDateTime
      }
      eventdata
    }
  }
`;

const FORCE_UPDATE_EVENT = gql`
  mutation ForceUpdateEvent($eventData: JSONString!) {
    forceUpdateEvent(eventData: $eventData) {
      success
      message
      event {
        id
        startDateTime
        endDateTime
      }
    }
  }
`;



const COMPLETE_UPDATE_EVENT = gql`
  mutation CompleteUpdateEvent($eventData: JSONString!) {
    completeUpdateEvent(eventData: $eventData) {
      statusCode
      message
      eventdata
    }
  }
`;

const FORCE_COMPLETE_UPDATE_EVENT = gql`
  mutation ForceCompleteUpdateEvent($eventData: JSONString!) {
    forceCompleteUpdateEvent(eventData: $eventData) {
      success
      message
    }
  }
`;

export {
  CREATE_EVENT,
  GET_ALL_EVENTS,
  GET_ALL_EVENTS_DURATION_EXCLUDE_ALL_DAY,
  GET_ALL_EVENTS_DURATION_ALL_DAY,
  GET_UPCOMING_EVENTS,
  DELETE_EVENT,
  UPDATE_EVENT,
  COMPLETE_UPDATE_EVENT,
  FORCE_CREATE_EVENT,
  FORCE_UPDATE_EVENT,
  FORCE_COMPLETE_UPDATE_EVENT
};
