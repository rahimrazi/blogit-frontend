import React from "react";
import { css } from "@emotion/react";

import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import RiseLoader from "react-spinners/CircleLoader";

//css
const override= {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};
const color = "red"
const loading = true

const LoadingComponent = () => {
  return <ClipLoader
  color={color}
  loading={loading}
  cssOverride={override}
  size={150}
  aria-label="Loading Spinner"
  data-testid="loader"
/>;
};

export default LoadingComponent;
