import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardActions,
  CardContent,
  Button,
  Typography,
  Paper,
  Card,
} from "@material-ui/core";

const myStyles = makeStyles({
  root: {
    height: 30,
  },
  cardContent: {
    backgroundColor: "#d9dcde",
    paddingTop: 0,
    paddingBottom: 0,
    color: "black",
  },
  selectedCardContent: {
    backgroundColor: "#2d83cf",
    paddingTop: 0,
    paddingBottom: 0,
    color: "white",
  },
});

const SuggestionItem = (props) => {
  const classes = myStyles();

  return (
    <Card className={classes.root} square>
      <CardContent
        className={
          props.flag ? classes.selectedCardContent : classes.cardContent
        }
      >
        <Typography>{props.children}</Typography>
      </CardContent>
    </Card>
  );
};

export default SuggestionItem;
