import React, { Fragment } from "react";
import classes from "./PlaceCard.module.css";

const PlaceCard = ({ data, show, onSetCoordinatesItem, onSetDisplayList }) => {
  const long = data.geometry.coordinates[0]
  const lat = data.geometry.coordinates[1]

  const handleClick = () => {
    onSetCoordinatesItem(long, lat);
    onSetDisplayList(false);
  }
  return (
    <Fragment>
      {show && <p className={classes.card} onClick={handleClick}>{data.place_name}</p>}
    </Fragment>
  );
};

export default PlaceCard;
