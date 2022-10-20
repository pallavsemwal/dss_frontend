import {gql} from "apollo-boost";

const GET_PARTICULAR_SCHEME_INFO_FOR_DISTRICT = gql`
  query scheme($id: ID, $name: String, $districtName: String) {
    scheme(id: $id, name: $name, districtName: $districtName) {
      name
      details
      numPeopleLeft
      numPeopleReached
    }
  }
`;

const ALL_SCHEMES_COUNTRY_WIDE = gql`
  {
    allSchemes
  }
`;

const GET_TOP_SCHEMES_FOR_USER = gql`
  query topSchemes {
    topSchemes {
      name
      details
      numPeopleLeft
      numPeopleReached
    }
  }
`;

const GET_ALL_SCHEMES_FOR_USER = gql`
  query allSchemesDistrict {
    allSchemesDistrict {
      name
      details
      numPeopleLeft
      numPeopleReached
      image
    }
  }
`;

const CREATE_SCHEME = gql`
  mutation CreateScheme($schemeData: JSONString!) {
    createScheme(schemeData: $schemeData) {
      success
      message
    }
  }
`;

export {
  GET_ALL_SCHEMES_FOR_USER,
  ALL_SCHEMES_COUNTRY_WIDE,
  GET_PARTICULAR_SCHEME_INFO_FOR_DISTRICT,
  GET_TOP_SCHEMES_FOR_USER,
  CREATE_SCHEME
};
