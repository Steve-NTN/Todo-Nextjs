import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export interface IFloatButtonProps {}

export default function FloatButton(props: any) {
  const divStyles: React.CSSProperties = {
    position: "fixed",
    right: "16px",
    bottom: "16px",
    cursor: "pointer"
  };

  const svgStyles: React.CSSProperties = {
    height: "2em",
    width: "2em",
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%, 50%)",
    color: "#fff",
  };

  const buttonStyles: React.CSSProperties = {
    borderRadius: "50%",
    width: "4em",
    height: "4em",
  };
  return (
    <div style={divStyles} onClick={props?.onClick}>
      <button
        style={buttonStyles}
        className="btn btn-primary"
        type="button"
      ></button>
      <FontAwesomeIcon icon={faPlus} style={svgStyles} />
    </div>
  );
}
