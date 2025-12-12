import { Card, FileInput, Label, TextInput } from "flowbite-react";
import { AiOutlineRadiusUpleft } from "react-icons/ai";
import { MdGrid4X4 } from "react-icons/md";
import {
  PiColumnsPlusRightFill,
  PiRowsPlusBottomFill,
  PiSquareBold,
  PiSquaresFourBold,
  PiResizeBold,
  PiArrowsOutLineVerticalFill,
} from "react-icons/pi";
import Sketch from "../Sketch";

type PropsType = {
  options: {
    cols: number;
    rows: number;
    square: number;
    px: number;
    margin: number;
    strokeWidth: number;
    cornerRadius: number;
    fill: string;
    stroke: string;
    bgFill: string;
    line: number;
    lineWidth: number;
    lineFill: string;
    bgImage: string;
  };
  update: Function;
};
type SketchOnChangeType = {
  r: number;
  g: number;
  b: number;
  a: number;
};

function Form({ options, update }: PropsType) {
  return (
    <article className="m-auto my-6 max-w-4xl px-4 xl:max-w-7xl">
      <Card className="my-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <p className="col-span-1 sm:col-span-2 text-xl font-black md:col-span-3 lg:col-span-4 xl:col-span-6">
            盤面の設定
          </p>
          <div>
            <Label htmlFor="cols">横幅</Label>
            <TextInput
              id="cols"
              type="number"
              min="1"
              icon={PiColumnsPlusRightFill}
              value={options.cols}
              onChange={(e) => {
                const v = Number(e.target.value);
                update("cols", v > 0 ? v : 1);
              }}
            />
          </div>
          <div>
            <Label htmlFor="rows">縦幅</Label>
            <TextInput
              id="rows"
              type="number"
              min="1"
              icon={PiRowsPlusBottomFill}
              value={options.rows}
              onChange={(e) => {
                const v = Number(e.target.value);
                update("rows", v > 0 ? v : 1);
              }}
            />
          </div>
          <div>
            <Label htmlFor="square">1マスあたりの駒サイズは？</Label>
            <TextInput
              id="square"
              type="number"
              min="1"
              icon={PiSquareBold}
              value={options.square}
              onChange={(e) => {
                const v = Number(e.target.value);
                update("square", v > 0 ? v : 1);
              }}
            />
          </div>
          <div>
            <Label htmlFor="px">1マスあたり何px？</Label>
            <TextInput
              id="px"
              type="number"
              min="1"
              icon={PiResizeBold}
              value={options.px}
              onChange={(e) => {
                const v = Number(e.target.value);
                update("px", v > 0 ? v : 1);
              }}
            />
          </div>
        </section>
      </Card>
      <Card className="my-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <p className="col-span-1 sm:col-span-2 text-xl font-black md:col-span-3 lg:col-span-4 xl:col-span-6">
            マスの設定
          </p>
          <div>
            <Sketch
              id="fill"
              value="マスの色"
              color={options.fill}
              onChange={(e: SketchOnChangeType) =>
                update("fill", `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`)
              }
            />
          </div>
          <div>
            <Label htmlFor="margin">余白は何px？</Label>
            <TextInput
              id="margin"
              type="number"
              min="0"
              icon={PiSquaresFourBold}
              value={options.margin}
              onChange={(e) => {
                const v = Number(e.target.value);
                update("margin", v > 0 ? v : 0);
              }}
            />
          </div>
          <div>
            <Label htmlFor="cornerRadius">マスの丸みは何px？</Label>
            <TextInput
              id="cornerRadius"
              type="number"
              min="0"
              icon={AiOutlineRadiusUpleft}
              value={options.cornerRadius}
              onChange={(e) => {
                const v = Number(e.target.value);
                update("cornerRadius", v > 0 ? v : 0);
              }}
            />
          </div>
          <div>
            <Label htmlFor="strokeWidth">線の太さ何px？</Label>
            <TextInput
              id="strokeWidth"
              type="number"
              min="0"
              icon={PiArrowsOutLineVerticalFill}
              value={options.strokeWidth}
              onChange={(e) => {
                const v = Number(e.target.value);
                update("strokeWidth", v > 0 ? v : 0);
              }}
            />
          </div>
          <div>
            <Sketch
              id="stroke"
              value="線の色"
              color={options.stroke}
              onChange={(e: SketchOnChangeType) =>
                update("stroke", `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`)
              }
            />
          </div>
          <div>
            <Sketch
              id="bgFill"
              value="背景の色"
              color={options.bgFill}
              onChange={(e: SketchOnChangeType) =>
                update("bgFill", `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`)
              }
            />
          </div>
        </section>
      </Card>
      <Card className="my-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <p className="col-span-1 sm:col-span-2 text-xl font-black md:col-span-3 lg:col-span-4 xl:col-span-6">
            罫線の設定
          </p>

          <div>
            <Label htmlFor="line">何マスごとに罫線を引く？</Label>
            <TextInput
              id="line"
              type="number"
              min="0"
              icon={MdGrid4X4}
              value={options.line}
              onChange={(e) => {
                const v = Number(e.target.value);
                update("line", v > 0 ? v : 0);
              }}
            />
          </div>
          <div>
            <Label htmlFor="lineWidth">罫線の太さ何px？</Label>
            <TextInput
              id="lineWidth"
              type="number"
              min="0"
              icon={PiArrowsOutLineVerticalFill}
              value={options.lineWidth}
              onChange={(e) => {
                const v = Number(e.target.value);
                update("lineWidth", v > 0 ? v : 0);
              }}
            />
          </div>
          <div>
            <Sketch
              id="lineFill"
              value="罫線の色"
              color={options.lineFill}
              onChange={(e: SketchOnChangeType) =>
                update("lineFill", `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`)
              }
            />
          </div>
        </section>
      </Card>
      <Card className="my-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <p className="col-span-1 sm:col-span-2 text-xl font-black md:col-span-3 lg:col-span-4 xl:col-span-6">
            その他の設定
          </p>
          <div className="col-span-2">
            <Label htmlFor="bgImage">お試し画像</Label>
            <FileInput
              id="bgImage"
              accept="image/*"
              onChange={(event) => {
                const target = event.target;
                const files = target.files;
                if (files == null) return;
                const file = files[0];
                if (file == null) return;
                const type = file.type;
                if (!/^image/.test(type)) return;
                const reader = new FileReader();
                reader.onload = (e) => {
                  const target = e.target;
                  if (target == null) return;
                  const result = target.result;
                  if (result == null) return;
                  update("bgImage", String(result));
                };
                reader.readAsDataURL(file);
              }}
            />
          </div>
        </section>
      </Card>
    </article>
  );
}

export default Form;
