import {gql} from "apollo-boost";

const GET_USER_INFO = gql`
  {
    user {
      id
      email
      firstName
      lastName
      profile {
        rank
        batch
        district {
          id
          name
        }
        image
      }
    }
  }
`;

export {GET_USER_INFO};
