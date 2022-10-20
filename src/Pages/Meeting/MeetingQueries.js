import {gql} from "apollo-boost";

const SEARCH_EVENTS = gql`
  query searchEvents($eventData: JSONString!) {
    searchEvents(eventData: $eventData) {
      id
      eventName
      isAllDay
      startDateTime
      endDateTime
      location
      priority
      tags {
        name
      }
      mom
      files {
        id
        file
      }
    }
  }
`;

const GET_ALL_TAGS = gql`
  query allTags {
    allTags {
      id
      name
    }
  }
`;

export {SEARCH_EVENTS, GET_ALL_TAGS};
