// Custom component that only return with props.children--> what is inside the component

import React from 'react';

import classes from './Spinner.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const spinner = <FontAwesomeIcon icon={faSpinner} className={`${classes.icon} fa-spin`}/>;


const Spinner = (props) => {
  return (
    spinner
  )
};

export default Spinner;