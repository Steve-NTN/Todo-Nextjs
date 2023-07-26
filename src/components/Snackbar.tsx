import React, { useEffect } from "react";

type Props = {
  show: boolean;
  text: string;
  onCloseSnackbar: any;
};

const Snackbar = (props: Props) => {
  const snackbar = document.getElementById("snackbar");
  
  useEffect(() => {
    setTimeout(() => {
      if (snackbar && props?.show) {
        props.onCloseSnackbar();
      }
    }, 3000);
  }, [props.show]);

  return (
    <div
      className={`toast ${props.show ? "show" : ""}`}
      id="snackbar"
      style={{ position: "fixed", bottom: 16, right: 16 }}
    >
      <div className="toast-body">{props.text}</div>
    </div>
  );
};

export default Snackbar;
