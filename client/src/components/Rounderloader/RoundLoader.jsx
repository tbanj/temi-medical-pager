import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./rounderloader.css";

const RoundLoader = ({ loaderIcon }) => {
  return (
    <Fragment>
      <div
        id="loader"
        style={{
          width: loaderIcon.width,
          height: loaderIcon.height,
          borderTop: loaderIcon.borderTop,
          padding: loaderIcon.padding,
        }}
        className={`loader mx-3`}
      ></div>
    </Fragment>
  );
};

RoundLoader.propTypes = {
  loaderIcon: PropTypes.object.isRequired,
};

export default RoundLoader;
