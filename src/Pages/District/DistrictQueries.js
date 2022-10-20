import {gql} from "apollo-boost";

const GET_DISTRICT_INFO = gql`
  query district($id: ID, $name: String) {
    district(id: $id, name: $name) {
      id
      name
      state
      area
      location
      population
    }
  }
`;
const GET_ALL_DISTRICTS = gql`
  {
    allDistricts {
      id
      name
      state
    }
  }
`;

export {GET_DISTRICT_INFO, GET_ALL_DISTRICTS};
