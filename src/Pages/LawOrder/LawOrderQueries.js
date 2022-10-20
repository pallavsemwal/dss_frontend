import { gql } from "apollo-boost";

const CREATE_RALLY = gql`
  mutation CreateRally($rallyData: JSONString!) {
    createRally(rallyData: $rallyData) {
      success
      message
    }
  }
`;

const CREATE_GATHERING = gql`
  mutation CreateGathering($gatheringData: JSONString!) {
    createGathering(gatheringData: $gatheringData) {
      success
      message
    }
  }
`;

const CREATE_CRIME = gql`
  mutation CreateCrime($crimeData: JSONString!) {
    createCrime(crimeData: $crimeData) {
      success
      message
    }
  }
`;

const CREATE_CALAMITY = gql`
  mutation CreateCalamity($calamityData: JSONString!) {
    createCalamity(calamityData: $calamityData) {
      success
      message
    }
  }
`;

const CREATE_EPIDEMIC = gql`
  mutation CreateEpidemic($epidemicData: JSONString!) {
    createEpidemic(epidemicData: $epidemicData) {
      success
      message
    }
  }
`;

const GET_ALL_CRIMES = gql`
  query allCrimes {
    allCrimes {
      id
      title
      crimeType
      area
      dateTime
      lessonLearnt
    }
  }
`;

const GET_ALL_CALAMITIES = gql`
  query allCalamities {
    allCalamities {
      id
      title
      calamityType
      totalCost
      injured
      dead
      peopleAffected
      startDate
      endDate
      police
      ambulance
      ndrf
      lessonLearnt
    }
  }
`;

const GET_ALL_EPIDEMICS = gql`
  query allEpidemics {
    allEpidemics {
      id
      title
      epidemicType
      totalInfected
      cured
      died
      year
      hospitalbeds
      healthstaff
      police
      lessonLearnt
    }
  }
`;

const GET_ALL_RALLIES = gql`
  query allRallies {
    allRallies {
      id
      rallyTitle
      religious
      political
      social
      government
      protest
      attendance
      stationary
      startLocation
      endLocation
      police
      ambulance
      firefighters
      lessonsLearnt
      date
    }
  }
`;

const GET_ALL_GATHERINGS = gql`
  query allGatherings {
    allGatherings {
      id
      title
      religious
      political
      social
      government
      protest
      attendance
      close
      location
      police
      ambulance
      firefighters
      lessonsLearnt
      date
    }
  }
`;

const CREATE_LAW_ORDER_SITUATION = gql`
  mutation createLawAndOrderSituation(
    $arrangements: JSONString!
    $configuration: JSONString!
    $situationType: String!
  ) {
    createLawAndOrderSituation(
      arrangements: $arrangements
      configuration: $configuration
      situationType: $situationType
    ) {
      success
    }
  }
`;

const SUGGEST_ARRANGMENT = gql`
  query suggestArrangement(
    $configuration: JSONString!
    $situationType: String!
  ) {
    suggestArrangement(
      configuration: $configuration
      situationType: $situationType
    )
  }
`;

const GET_RECOMMENDED_EVENTS = gql`
  query suggestEvents($startString: String) {
    suggestEvents(startString: $startString) {
      id
      eventName
    }
  }
`;

export {
  GET_RECOMMENDED_EVENTS,
  SUGGEST_ARRANGMENT,
  CREATE_LAW_ORDER_SITUATION,
  GET_ALL_CALAMITIES,
  GET_ALL_RALLIES,
  GET_ALL_CRIMES,
  GET_ALL_EPIDEMICS,
  GET_ALL_GATHERINGS,
  CREATE_CALAMITY,
  CREATE_EPIDEMIC,
  CREATE_RALLY,
  CREATE_CRIME,
  CREATE_GATHERING,
};
