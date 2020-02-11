import React, { CSSProperties, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "../store/reducer";
import styled from "styled-components";
import { Empty } from "antd";
import GlyphCanvasMng from '../libs/GlyphCanvasMng';

const Div = styled.div`
  width: 100%;
  min-height: 200px;
  background: #888888;
  overflow: auto;
  position: relative;
  text-align: center;
  vertical-align: middle;
`;

const canvasStyle: CSSProperties = {
  display: "none",
  margin: "auto",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

interface GlyphCanvasAreaProps {
  gcm: GlyphCanvasMng;
}

type Props = AppState & GlyphCanvasAreaProps;

const GlyphCanvas = function(props: Props) {
  // console.log("GlyphCacnvas", props);
  const div = useRef<HTMLDivElement>(null);
  const emptyDiv = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const emptyStyle: CSSProperties = {
    margin: "30px auto"
  };

  useEffect(() => {
    props.gcm.init(div.current, canvas.current, props);
    if (emptyDiv.current != null && props.gcm.visible) {
      emptyDiv.current.style.display = "none";
    }
  });

  return (
    <Div ref={div}>
      <div ref={emptyDiv}>
        <Empty
          style={emptyStyle}
          description={"画像ファイルを読み込んでください"}
        />
      </div>
      <canvas ref={canvas} style={canvasStyle} />
    </Div>
  );
};

export default connect((state: AppState) => state)(GlyphCanvas);
