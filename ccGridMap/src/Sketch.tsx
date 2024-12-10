import { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import { IoMdColorPalette } from "react-icons/io";

type PropsType = {
  id: string;
  value: string;
  color: string;
  onChange: Function;
};

function Sketch({ id, value, color, onChange }: PropsType) {
  const state = {
    displayColorPicker: false,
    color: { r: 0, g: 0, b: 0, a: 1 },
  };
  const colorMatch = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/,
  );
  if (colorMatch) {
    state.color = {
      r: Number(colorMatch[1]),
      g: Number(colorMatch[2]),
      b: Number(colorMatch[3]),
      a: Number(colorMatch[4]),
    };
  }
  const [options, setOptions] = useState(state);
  const handleClick = () => {
    setOptions((prev) => ({
      ...prev,
      displayColorPicker: !options.displayColorPicker,
    }));
  };
  const handleClose = () => {
    setOptions((prev) => ({ ...prev, displayColorPicker: false }));
  };
  const handleChange = (color: ColorResult) => {
    const { r, g, b, a } = color.rgb;
    const rgb = { r: Number(r), g: Number(g), b: Number(b), a: Number(a) };
    setOptions((prev) => ({ ...prev, color: rgb }));
    onChange(color.rgb);
  };

  return (
    <>
      <label
        className="text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={id}
        onClick={handleClick}
      >
        {value}
      </label>
      <div className="flex grow" style={{ height: "42px" }}>
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <IoMdColorPalette className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <div
            className="block h-full w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 pl-10 text-sm text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
            onClick={handleClick}
          >
            <div className="h-full w-full rounded border border-gray-300 p-1 dark:border-gray-600">
              <div
                className="h-full w-full rounded-sm"
                style={{
                  background: `rgba(${options.color.r}, ${options.color.g}, ${options.color.b}, ${options.color.a})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {options.displayColorPicker && (
        <div className="absolute z-20">
          <div className="fixed inset-0" onClick={handleClose} />
          <SketchPicker
            color={options.color}
            onChange={handleChange}
            className="dark:text-black"
          />
        </div>
      )}
    </>
  );
}

export default Sketch;
