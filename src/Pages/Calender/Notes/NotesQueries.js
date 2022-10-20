import {gql} from "apollo-boost";

const UPLOAD_EVENT_MATERIAL = gql`
  mutation eventMaterialMutation(
    $eventId: ID!
    $files: [Upload]
    $notes: JSONString
  ) {
    eventMaterialMutation(eventId: $eventId, files: $files, notes: $notes) {
      success
    }
  }
`;

export {UPLOAD_EVENT_MATERIAL};
