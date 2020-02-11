import React, { CSSProperties } from "react";
import { connect } from "react-redux";
import {
  setFrameWidth,
  setFrameHeight,
  setFrameTime,
  setTotalFrames
} from "../store/actions";
import { AppState } from '../store/reducer';
import SourceImage from "./SourceImage";
import {
  Typography,
  Card,
  Slider,
  InputNumber,
  Row,
  Col,
  Statistic
} from "antd";
const { Text } = Typography;

const rowStyle: CSSProperties = {
  marginBottom: "1em"
};

function BasicSettingCard(props: AppState) {
  return (
    <Card title={"基本設定"}>
      <h4>元画像ファイル</h4>
      <SourceImage />
      <h4>フレームサイズ (pixel)</h4>
      <Row style={rowStyle}>
        <Col span={4}>
          <Text style={{ lineHeight: "30px" }}>幅:</Text>
        </Col>
        <Col span={7}>
          <InputNumber
            min={1}
            max={300}
            style={{ width: "100%" }}
            value={props.frameWidth}
            onChange={v => props.dispatch(setFrameWidth(v as number))}
          />
        </Col>
        <Col span={4} offset={2}>
          <Text style={{ lineHeight: "30px" }}>高さ:</Text>
        </Col>
        <Col span={7}>
          <InputNumber
            min={1}
            max={300}
            style={{ width: "100%" }}
            value={props.frameHeight}
            onChange={v => props.dispatch(setFrameHeight(v as number))}
          />
        </Col>
      </Row>
      <h4>1フレームの時間 (ms)</h4>
      <Row style={rowStyle}>
        <Col span={16}>
          <Slider
            min={1}
            max={200}
            value={props.frameTime}
            onChange={v => props.dispatch(setFrameTime(v as number))}
          />
        </Col>
        <Col span={7} offset={1}>
          <InputNumber
            min={1}
            max={200}
            style={{ width: "100%" }}
            value={props.frameTime}
            onChange={v => props.dispatch(setFrameTime(v as number))}
          />
        </Col>
      </Row>
      <h4>全体フレーム数</h4>
      <Row style={rowStyle}>
        <Col span={16}>
          <Slider
            min={1}
            max={200}
            value={props.totalFrames}
            onChange={v => props.dispatch(setTotalFrames(v as number))}
          />
        </Col>
        <Col span={7} offset={1}>
          <InputNumber
            min={1}
            max={200}
            style={{ width: "100%" }}
            value={props.totalFrames}
            onChange={v => props.dispatch(setTotalFrames(v as number))}
          />
        </Col>
      </Row>
      <h4>全体フレーム時間</h4>
      <Row style={rowStyle}>
        {props.frameTime}ms × {props.totalFrames} =
        <div style={{ display: "inline-block", marginLeft: 5 }}>
          <Statistic value={props.frameTime * props.totalFrames} suffix="ms" />
        </div>
        <br />
        <Text style={{ fontSize: "0.9em" }}>
          (フレーム時間 × フレーム数 = 全体時間)
        </Text>
      </Row>
    </Card>
  );
}

export default connect((state: AppState) => state)(BasicSettingCard);
