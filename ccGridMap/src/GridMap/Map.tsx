import { Fragment, useRef } from "react";
import { Button } from "flowbite-react";
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

  return (
    <>
      <div className="relative my-6 overflow-hidden">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <div
            className="absolute bg-cover bg-center blur"
            style={{
              backgroundImage: bgImage ? `url(${bgImage})` : "none",
              inset: "-8px",
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
          <Button className="m-auto mb-6" onClick={handleExport}>
            Grid Mapをダウンロード
          </Button>
          <Stage
            width={cols * px}
            height={rows * px}
            className="flex justify-center"
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
      </div>
    </>
  );
}

export default Map;
