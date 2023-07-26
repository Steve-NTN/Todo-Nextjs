import React from "react";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  styles?: any;
  name?: string
}

const options = [
  { label: "Typ1", value: "1" },
  { label: "Typ2", value: "2" },
];

export default function Select({ onChange, styles, name }: Props) {
  return (
    <select
      className="form-select"
      onChange={onChange}
      aria-label="Loại"
      style={styles}
      name={name}
    >
      {options?.map((option, idx) => (
        <option key={idx} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </select>
  );
}
