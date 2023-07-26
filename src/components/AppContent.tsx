import * as React from "react";

export interface IAppProps {
  children: React.ReactNode;
  bonusClass?: string;
}

export default function AppContent(props: IAppProps) {
  const styles = {
    backgroundColor: "#fff",
    flex: 1,
    marginTop: 0,
  };

  return (
    <div style={styles} className={`p-2 ${props?.bonusClass || ""}`}>
      {" "}
      {props?.children}
    </div>
  );
}
