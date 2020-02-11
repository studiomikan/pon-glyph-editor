import React from "react";
import { connect } from "react-redux";
import { AppState } from "./store/reducer";
import { setImageSrc } from "./store/actions";
import { Typography } from "antd";

const { Text } = Typography;

const Hoge = function(props: AppState) {
  props.dispatch(setImageSrc("あいうえお"));

  return (
    <div>
      <Text>Hello React</Text>
      <Text>{props.imageSrc}</Text>
    </div>
  );
}

export default connect((state: AppState) => state)(Hoge);
