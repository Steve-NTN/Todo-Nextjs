import * as React from "react";

export interface AppProps {
  children: React.ReactNode;
}

const styles = {
  backgroundColor: "#fff",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function App(props: AppProps) {
  return <div style={styles}>{props?.children}</div>;
}
