import { Fragment, useRef, useState } from "react";
import { Button, Label, RangeSlider, Tooltip } from "flowbite-react";
import { Stage, Layer, Line, Rect } from "react-konva";
import Konva from "konva";

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
};

function Map({ options }: PropsType) {
  const {
    cols,
    rows,
    square,
    px,
    margin,
    strokeWidth,
    cornerRadius,
    fill,
    stroke,
    bgFill,
    line,
    lineWidth,
    lineFill,
    bgImage,
  } = options;
  const create2DArray = (options: PropsType["options"]) => {
    const {
      cols,
      rows,
      px,
      square,
      margin,
      cornerRadius,
      fill,
      stroke,
      strokeWidth,
    } = options;
    // 偶数ならTrue
    const isEven = strokeWidth % 2 === 0;
    // 縦軸と横軸の数
    const col = cols / square;
    const row = rows / square;
    // 枠の大きさは 正方形のサイズ * 駒のサイズ - 枠線（枠線は中心から描写されてるので1つでOK） - 余白（↔↕なので*2）
    const h = px * square - strokeWidth - margin * 2;
    const height = h > 0 ? h : 0;
    const w = px * square - strokeWidth - margin * 2;
    const width = w > 0 ? w : 0;
    // Math.round(x) + 0.5 をすることで描画位置をピクセルの境界ではなく中心に配置
    // その結果、ピクセルがぼやける問題を修正できる
    // ただし枠線が奇数のときのみ有効にする
    const alignPixelGrid = (num: number) => Math.round(num) + 0.5;
    return Array.from({ length: row }, (_, r) => {
      // 縦軸の座標は 行数 * 正方形のサイズ * 駒サイズ + 枠線
      const Y = r * px * square + Math.floor(strokeWidth / 2) + margin;
      const y = isEven ? Y : alignPixelGrid(Y);
      return Array.from({ length: col }, (_, c) => {
        const X = c * px * square + Math.floor(strokeWidth / 2) + margin;
        const x = isEven ? X : alignPixelGrid(X);
        return { x, y, height, width, cornerRadius, fill, stroke, strokeWidth };
      });
    });
  };
  const cellArray = create2DArray(options);

  // 横のライン
  const hNum = line > 0 ? rows / square / line + 1 : 0;
  const horizontalLineArray = Array.from({ length: hNum }, (_, i) => i);
  // 縦のライン
  const vNum = line > 0 ? cols / square / line + 1 : 0;
  const verticalLineArray = Array.from({ length: vNum }, (_, i) => i);

  const downloadURI = (uri: string, name: string) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const stageRef = useRef<Konva.Stage | null>(null);
  const handleExport = () => {
    if (stageRef == null) return;
    const current = stageRef.current;
    if (current == null) return;
    const uri = current.toDataURL();
    downloadURI(uri, "GridMap.png");
  };

  const [rangeNum, setRangeNum] = useState(10);

  return (
    <>
      <article className="m-auto my-6 max-w-4xl px-4 xl:max-w-7xl">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <Button className="m-auto md:col-start-2" onClick={handleExport}>
            Grid Mapをダウンロード
          </Button>
          <div className="">
            <Label
              htmlFor="default-range"
              value="マップの拡大・縮小"
              className="mb-1 block"
            />
            <Tooltip
              content={`現在の倍率：${rangeNum / 10}倍`}
              placement="bottom"
            >
              <RangeSlider
                id="default-range"
                min="1"
                max="10"
                value={rangeNum}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setRangeNum(v);
                }}
              />
            </Tooltip>
          </div>
        </div>
      </article>
      <article
        className="my-6"
        style={{
          height: (rows * px * rangeNum) / 10,
        }}
      >
        <section
          className="relative"
          style={{ transform: `scale(${rangeNum / 10})` }}
        >
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              height: rows * px,
            }}
          >
            <div
              className="absolute bg-cover bg-center blur"
              style={{
                backgroundImage: bgImage ? `url(${bgImage})` : "none",
                inset: "-8px",
                height: rows * px + 8 * 2,
              }}
            ></div>
          </div>
          <div
            className="absolute bg-cover bg-center"
            style={{
              backgroundImage: bgImage ? `url(${bgImage})` : "none",
              width: cols * px,
              height: rows * px,
              left: `calc( 50% - ${(cols * px) / 2}px )`,
            }}
          ></div>
          <Fragment>
            <Stage
              width={cols * px}
              height={rows * px}
              className="absolute"
              style={{
                left: `calc( 50% - ${(cols * px) / 2}px )`,
              }}
              ref={stageRef}
            >
              <Layer>
                <Rect
                  fill={bgFill}
                  x={0}
                  y={0}
                  width={cols * px}
                  height={rows * px}
                />
                {cellArray.map((vs, is) => {
                  return vs.map((v, i) => {
                    const {
                      x,
                      y,
                      height,
                      width,
                      cornerRadius,
                      fill,
                      stroke,
                      strokeWidth,
                    } = v;
                    const key = `${is}_${i}`;
                    return (
                      <Rect
                        key={key}
                        x={x}
                        y={y}
                        height={height}
                        width={width}
                        cornerRadius={cornerRadius}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                      />
                    );
                  });
                })}
                {horizontalLineArray.map((v) => {
                  return (
                    <Line
                      key={v}
                      stroke={lineFill}
                      strokeWidth={lineWidth}
                      x={0}
                      y={v * square * px * line}
                      points={[0, 0, px * cols, 0]}
                    />
                  );
                })}
                {verticalLineArray.map((v) => {
                  return (
                    <Line
                      key={v}
                      stroke={lineFill}
                      strokeWidth={lineWidth}
                      x={v * square * px * line}
                      y={0}
                      points={[0, px * rows, 0, 0]}
                    />
                  );
                })}
              </Layer>
            </Stage>
          </Fragment>
        </section>
      </article>
    </>
  );
}

export default Map;
