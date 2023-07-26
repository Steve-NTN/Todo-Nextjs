import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  name?: string;
}
export default function Input(props: Props) {
  return <input {...props} />;
}
