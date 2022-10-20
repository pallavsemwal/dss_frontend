import { gql } from "apollo-boost";

const CREATE_TAG = gql`
  mutation CreateTag($tagData: JSONString!) {
    createTag(tagData: $tagData) {
      tag {
        id
        name
      }
    }
  }
`;

const UPDATE_TAG = gql`
  mutation UpdateTag($id: ID!, $tagData: JSONString!) {
    updateTag(id: $id, tagData: $tagData) {
      tag {
        name
      }
    }
  }`;

const GET_ALL_TAGS = gql`
  query allTags {
    allTags {
      id
      name
      details
    }
  }
`;

const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!){
    deleteTag(id: $id){
      name
    }
  }`;

export {
  CREATE_TAG,
  GET_ALL_TAGS,
  UPDATE_TAG,
  DELETE_TAG,
};
