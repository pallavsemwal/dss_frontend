import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import SuggestionItem from "./SuggestionItem";

const myStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      display: "block",
      position: "absolute",
      overflow: "auto",
      zindex: 1500,
      maxHeight: 305,
      left: props.left - 100,
      top: props.top - 200,
    },
  }));

const SuggestionList = (props) => {
  const classes = myStyles(props.position)();

  return (
    <List className={classes.root} component="nav" aria-label="main">
      {props.suggestionItems.map((item, idx) => {
        if (idx >= props.suggestionIdx - 9) {
          return (
            <SuggestionItem
              key={idx}
              flag={idx === props.suggestionIdx ? true : false}
            >
              {item}
            </SuggestionItem>
          );
        } else return null;
      })}
    </List>
  );
};

export default SuggestionList;
