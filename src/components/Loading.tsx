const { useController } = require("react-controducer");
import { statusConfig } from "@/controducer/StatusController"; 
import * as React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

export interface LoadingProps {}

export default function Loading(props: LoadingProps) {
  const { loading } = useController(statusConfig?.name);

  return (
    <>
      {loading ? (
        <Background>
          <Spinner animation="border" variant="primary" />
        </Background>
      ) : (
        <></>
      )}
    </>
  );
}

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-items: center;
  align-items: center;
  z-index: 99;
  top: 0;
  left: 0;
  & > div {
    margin: 0 auto;
  }
`;
