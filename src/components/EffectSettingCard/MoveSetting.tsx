import React, { CSSProperties, useState } from "react";
import { connect } from "react-redux";
import { AppState } from '../../store/reducer';
import { Row, Slider, Switch } from "antd";

const rowStyle: CSSProperties = {
  marginBottom: "1em"
};

const MoveSetting = function(props: AppState) {
  const [clipEnabled, setClipEnabled] = useState<boolean>(true);

  function formatter(value: number) {
    return `${value}%`;
  }

  return (
    <div>
      <h4>
        <label style={{marginRight:"10px"}}>フレームサイズで切り抜く</label>
        <Switch size="small" checked={clipEnabled} />
      </h4>
      <Row style={rowStyle}>
        ※現在のバージョンでは、この設定は強制的にONになります。
      </Row>
      <h4>移動パス</h4>
      <Row style={rowStyle}>
      </Row>
    </div>
  );
}

export default connect((state: AppState) => state)(MoveSetting);
