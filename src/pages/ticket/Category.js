import React, { useState } from "react";
import Select from "react-select";

export default function ReactSelect({ options, selectedValue, ...props }) {
  const [selected, setSelected] = useState(selectedValue);

  const customStyles = (value) => ({
    control: (styles) => ({
      ...styles,
      minHeight: "31px",
      height: "31px",
      color:
        value === "feature-request"
          ? "white"
          : value === "disconnection"
          ? "yellow"
          : value === "bug-error"
          ? "white"
          : value === "sales"
          ? "white"
          : value === "complaint"
          ? "pink"
          : value === "orders"
          ? "lime"
          : "white",
      width: "120px",
      backgroundColor:
        value === "feature-request"
          ? "#ff5b57"
          : value === "disconnection"
          ? "#f1c40f"
          : value === "bug-error"
          ? "#2ecc71"
          : value === "sales"
          ? "#2b9fc1"
          : value === "complaint"
          ? "#f1c40f"
          : value === "orders"
          ? "#2ecc71"
          : "white",
    }),

    option: (provided) => ({
      ...provided,
      padding: "20px",
      minHeight: "25px",
      height: "25px",
    }),
  });

  const onChange = (e) => {
    setSelected(e.value);
  };

  const displayItem = (selected) => {
    const item = options.find((x) => x.value === selected);
    return item ? item : { value: "", label: "" };
  };

  return (
    <Select
      maxMenuHeight={90}
      onChange={onChange}
      styles={customStyles(selected)}
      options={options}
      placeholder={"Select Category"}
      value={displayItem(selected)}
      {...props}
    />
  );
}
