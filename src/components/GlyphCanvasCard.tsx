import React, {CSSProperties, useState, useRef}  from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { AppState } from "../store/reducer";
import { Card, Button, Modal, Checkbox } from "antd";
import GlyphCanvas from "./GlyphCanvas";
import GlyphCanvasMng from '../libs/GlyphCanvasMng';
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const Controls = styled.div`
  margin-top: 24px;
`;

const textAreaStyle: CSSProperties = {
  width: "100%",
  height: "200px",
  border: "solid 1px #888",
  marginBottom: "1em",
};

let gcm: GlyphCanvasMng = new GlyphCanvasMng();

const GlyphCanvasCard = function(props: AppState) {
  const scriptTextArea = useRef<HTMLTextAreaElement>(null);
  const [script, setScript] = useState<string>("");
  const [scriptModalVisible, setScriptModalVisible] = useState<boolean>(false);
  const [scriptFormated, setScriptFormated] = useState<boolean>(false);

  const onClickDownloadImage = () => {
    if (!gcm.visible) {
      Modal.error({
        title: "エラー",
        content: "画像ファイルを読み込んでください"
      });
      return;
    }
    const dummyLink = document.createElement("a");
    let data =  gcm.toDataUrl();
    if (data != null) {
      dummyLink.href = data;
      dummyLink.download = "generated_glyph.png";
      dummyLink.click();
    }
  };

  const genScriptString = (formated: boolean) => {
    if (formated) {
      return JSON.stringify(gcm.genScript(), null, "  ");
    } else {
      return JSON.stringify(gcm.genScript());
    }
  };

  const onClickDownloadScript = () => {
    if (!gcm.visible) {
      Modal.error({
        title: "エラー",
        content: "画像ファイルを読み込んでください"
      });
      return;
    }
    setScript(genScriptString(scriptFormated));
    setScriptModalVisible(true);
  };

  const onChangeScriptFormated = (e: CheckboxChangeEvent) => {
    const checked: boolean = e.target.checked;
    setScriptFormated(checked);
    setScript(genScriptString(checked));
  };

  const onClickCopy = () => {
    if (scriptTextArea.current != null) {
      scriptTextArea.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <Card title={"グリフ画像"}>
      <GlyphCanvas gcm={gcm} />
      <Controls>
        <Button
          type="primary"
          icon="download"
          shape="round"
          onClick={onClickDownloadImage}
          style={{ marginRight: "1em" }}
        >
          画像をダウンロード
        </Button>
        <Button
          type="primary"
          icon="download"
          shape="round"
          onClick={onClickDownloadScript}
        >
          フレーム指定をダウンロード
        </Button>
      </Controls>
      <Modal
        visible={scriptModalVisible}
        title="フレーム指定JavaScript"
        onOk={() => setScriptModalVisible(false)}
        onCancel={() => setScriptModalVisible(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => setScriptModalVisible(false)}
          >
            閉じる
          </Button>
        ]}
      >
        <p>コピー＆ペーストで使用してください。</p>
        <textarea
          ref={scriptTextArea}
          style={textAreaStyle}
          value={script}
          readOnly
        ></textarea>
        <Checkbox checked={scriptFormated} onChange={onChangeScriptFormated}>
          成形して表示
        </Checkbox>
        <Button onClick={onClickCopy}>クリップボードにコピー</Button>
      </Modal>
    </Card>
  );
};

export default connect((state: AppState) => state)(GlyphCanvasCard);
