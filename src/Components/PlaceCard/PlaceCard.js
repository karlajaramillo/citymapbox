import React, { Fragment } from "react";
import classes from "./PlaceCard.module.css";

const PlaceCard = ({ data, show }) => {
  return (
    <Fragment>
      {show && <p className={classes.card}>{data.place_name}</p>}
    </Fragment>
  );
};

export default PlaceCard;
