import { TODO_TITLE } from "@/constants";
import * as React from "react";
import styled from "styled-components";

export type IAppProps = {
  bonusClass?: string;
};

export default function TodoTitle(props: IAppProps) {
  const styles = {
    color: "#0d6efd",
    fontSize: "calc(1.375rem + 2.5vw)",
  };
  return (
    <p className={`${props?.bonusClass || ""}`} style={styles}>
      {TODO_TITLE}
    </p>
  );
}
