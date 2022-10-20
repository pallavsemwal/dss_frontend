import React, { useState } from "react";
import moment from "moment-timezone";
import styled from "styled-components";
import {
  Row,
  Col,
  Button,
  Input,
  Form,
  Label,
  Option,
  Dropdown,
  DropdownMenu,
} from "@bootstrap-styled/v4";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { GET_ALL_TAGS, SEARCH_EVENTS } from "./MeetingQueries";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

const SearchDiv = styled.div`
  margin: 24px 5%;
`;

const SearchInput = styled(Input)`
  &&& {
    width: 100%;
    border: none;
  }
`;

const AdvanceSearchDiv = styled.div`
  padding: 16px;
`;

const SearchBar = styled.div`
  height: 2.8em;
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin: 0px;
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  display: grid;
  grid-template-columns: auto 80px;
  grid-template-rows: auto;
  grid-template-areas: "inputArea buttonArea";
  &:hover {
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);
  }
`;

const ClearSpan = styled.span`
  transition: transform 5s ease-in-out;
  cursor: pointer;
  margin: 0px 8px;
  &:hover {
    color: red;
  }
`;

function SearchEvent({ setFilteredEvents }) {
  const [allDay, setAllDay] = useState(false);
  const [isAdvance, setIsAdvance] = useState(false);
  const { handleSubmit, control, reset } = useForm();
  const { data: tags } = useQuery(GET_ALL_TAGS);
  const [searchEvent] = useLazyQuery(SEARCH_EVENTS, {
    onError: (error) => alert("Unsuccessful! Try Again!"),
    onCompleted: (data) => {
      setFilteredEvents(data);
    },
  });

  const isInvalidString = (str) => {
    return str === undefined || str === "";
  };

  const joinUTCDateTime = (date, time) => {
    return moment(date + "-" + time, "YYYY-MM-DD-hh-mm")
      .utc()
      .format();
  };

  const onSubmit = (data) => {
    if (!isAdvance) {
      data = {
        content: data["event_name"],
        is_basic_search: true,
      };
    } else {
      data.is_basic_search = false;
      data.is_all_day = allDay;
      // Tags
      if (data["tags"] === undefined) delete data["tags"];
      else data["tags"] = data["tags"].map((obj) => obj["value"]);
      // Priority
      if (data["priority"] === "0" || data["priority"] === undefined)
        delete data["priority"];
      // String Atrributes
      if (isInvalidString(data["event_name"])) delete data["event_name"];

      if (isInvalidString(data["location"])) delete data["location"];
      // Start Date
      if (isInvalidString(data["start_date"])) delete data["start_date"];
      else {
        if (!isInvalidString(data["start_time"]))
          data["start_date"] = joinUTCDateTime(
            data["start_date"],
            data["start_time"]
          );
        else
          data["start_date"] = joinUTCDateTime(
            data["start_date"],
            "00:00 +0000"
          );
      }
      // End Date
      if (isInvalidString(data["end_date"])) delete data["end_date"];
      else {
        if (!isInvalidString(data["end_time"]))
          data["end_date"] = joinUTCDateTime(
            data["end_date"],
            data["end_time"]
          );
        else
          data["end_date"] = joinUTCDateTime(data["end_date"], "23:59 +0000");
      }
      // Time
      delete data["start_time"];
      delete data["end_time"];
    }

    if (
      data["start_date"] !== undefined &&
      data["end_date"] !== undefined &&
      data["start_date"] > data["end_date"]
    ) {
      alert("End Datetime should be after Start Datetime");
    } else {
      searchEvent({ variables: { eventData: JSON.stringify(data) } });
      setIsAdvance(false);
    }
  };

  const getOptions = (opList, key) => {
    if (opList && opList[key]) {
      return opList[key].map((val) => {
        return { value: val["id"], label: val["name"] };
      });
    }
  };

  return (
    <SearchDiv>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Dropdown isOpen={isAdvance}>
          <SearchBar>
            <div style={{ gridArea: "inputArea" }}>
              <Controller
                as={<SearchInput />}
                name="event_name"
                type="text"
                autoComplete="off"
                placeholder="Search"
                control={control}
                defaultValue=""
              />
            </div>
            <div style={{ gridArea: "buttonArea" }}>
              <ClearSpan style={{ verticalAlign: "middle" }} onClick={reset}>
                &#10539;
              </ClearSpan>
              <span
                style={{ verticalAlign: "middle" }}
                onClick={() => setIsAdvance(!isAdvance)}
              >
                {!isAdvance ? (
                  <ArrowDropDownIcon fontSize="large" />
                ) : (
                  <ArrowDropUpIcon fontSize="large" />
                )}
              </span>
            </div>
          </SearchBar>
          <DropdownMenu style={{ right: "0px" }}>
            <AdvanceSearchDiv>
              <Label>All Day</Label> &nbsp; &nbsp;
              <Controller
                as={<Input style={{ width: "10%", height: "16px" }} />}
                name="is_all_day"
                type="checkbox"
                defaultValue={false}
                onChange={() => setAllDay(!allDay)}
                control={control}
              />
              <br />
              <br />
              <Row>
                <Col>
                  <Label>Start Date:</Label> &nbsp; <br />
                  <Controller
                    as={<Input />}
                    name="start_date"
                    type="date"
                    control={control}
                  />
                  <br />
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
                    <br />
                  </Col>
                )}
                <Col>
                  <Label>End Date:</Label> &nbsp; <br />
                  <Controller
                    as={<Input />}
                    name="end_date"
                    type="date"
                    control={control}
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
                name="location"
                type="text"
                placeholder="E.g. Conference Room"
                control={control}
              />
              <br />
              <Row>
                <Col>
                  <Label>Tags:</Label> &nbsp; <br />
                  <Controller
                    as={
                      <Select
                        options={getOptions(tags, "allTags")}
                        isMulti={true}
                      />
                    }
                    type="select"
                    name="tags"
                    control={control}
                  />
                  <br />
                </Col>
                <Col>
                  <Label>Select Priority:</Label> &nbsp; <br />
                  <Controller
                    as={
                      <Input style={{ width: "95%" }}>
                        <Option value="0">None</Option>
                        <Option value="1">Low</Option>
                        <Option value="2">Normal</Option>
                        <Option value="3">High</Option>
                      </Input>
                    }
                    name="priority"
                    type="select"
                    control={control}
                  ></Controller>
                  <br />
                </Col>
              </Row>
              <Button type="submit" style={{ float: "right" }}>
                Search
              </Button>
            </AdvanceSearchDiv>
          </DropdownMenu>
        </Dropdown>
      </Form>
    </SearchDiv>
  );
}

export default SearchEvent;
