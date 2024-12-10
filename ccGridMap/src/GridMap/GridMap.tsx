import { useState } from "react";
import Form from "./Form";
import Map from "./Map";

function GridMap() {
  const defaultOptions = {
    cols: 40,
    rows: 30,
    square: 2,
    px: 24,
    margin: 2,
    strokeWidth: 1,
    cornerRadius: 4,
    fill: "rgba(246, 247, 248, 0.5)",
    stroke: "rgba(48, 40, 51, 1)",
    bgFill: "rgba(246, 247, 248, 0.1)",
    line: 5,
    lineWidth: 4,
    lineFill: "rgba(225, 52, 76, 0.5)",
    bgImage: "",
  };
  const [options, setOptions] = useState(defaultOptions);
  const updateOptions = (key: string, value: number | string) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <>
      <Form options={options} update={updateOptions} />
      <Map options={options} />
    </>
  );
}

export default GridMap;
