import React, { CSSProperties } from "react";

function ErrorMessage(props: any) {
  const buttonStyle: CSSProperties = {
    color: "red",
  };
  return <p style={buttonStyle}>{props.msg || "Error"}</p>;
}

export { ErrorMessage };
