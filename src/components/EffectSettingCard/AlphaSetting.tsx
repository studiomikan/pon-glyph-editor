import React, { CSSProperties } from "react";
import { connect } from "react-redux";
import { AppState } from '../../store/reducer';
import {
  setFadeInEnabled,
  setFadeInSpeed,
  setFadeOutEnabled,
  setFadeOutSpeed
} from "../../store/actions";
import { Row, Slider, Switch } from "antd";

// import styled from "styled-components";
// const SliderWrapper = styled.div`
//   position: relative;
//   padding: 0px 3em;
//   label {
//     position: absolute;
//     top: -2px;
//     width: 3em;
//     height: 16px;
//     line-height: 16px;
//     font-size: 14px;
//   }
//   label:first-child {
//     left: 0;
//     text-align: left;
//   }
//   label:last-child {
//     right: 0;
//     text-align: right;
//   }
// `;

const rowStyle: CSSProperties = {
  marginBottom: "1em"
};

function AlphaSetting(props: AppState) {
  function formatter(value: number) {
    return `${value}%`;
  }

  return (
    <div>
      <h4>
        <label style={{ marginRight: "10px" }}>フェードイン</label>
        <Switch
          size="small"
          checked={props.fadeInEnabled}
          onChange={v => props.dispatch(setFadeInEnabled(v))}
        />
      </h4>
      <Row style={rowStyle}>
        <Slider
          tipFormatter={formatter}
          onChange={v => props.dispatch(setFadeInSpeed(v as number))}
          value={props.fadeInSpeed}
          disabled={!props.fadeInEnabled}
        />
      </Row>
      <h4>
        <label style={{ marginRight: "10px" }}>フェードアウト</label>
        <Switch
          size="small"
          checked={props.fadeOutEnabled}
          onChange={v => props.dispatch(setFadeOutEnabled(v))}
        />
      </h4>
      <Row style={rowStyle}>
        <Slider
          tipFormatter={formatter}
          onChange={v => props.dispatch(setFadeOutSpeed(v as number))}
          value={props.fadeOutSpeed}
          disabled={!props.fadeOutEnabled}
        />
      </Row>
    </div>
  );
}

export default connect((state: AppState) => state)(AlphaSetting);
