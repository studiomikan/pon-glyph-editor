import React, { useCallback, useRef } from "react";
import { connect } from "react-redux";
import { AppState } from "../store/reducer";
import { setImageSrc, setImage } from "../store/actions";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

const Div = styled.div`
  margin-bottom: 20px;
`;

const Dropzone = styled.div`
  width: 100%;
  border: dashed 2px gray;
  text-align: center;
  display: table;
  p {
    display: table-cell;
    vertical-align: middle;
    width: 100%;
    height: 150px;
  }
  img {
    max-width: 100%;
    max-height: 150px;
    margin: auto;
  }
`;

const SourceImage = function(props: AppState) {
  const imgRef = useRef<HTMLImageElement>(null);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles == null || acceptedFiles.length === 0) {
      alert('対応していないファイルです。');
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      if (e != null && e.target != null && e.target.result != null) {
        props.dispatch(setImageSrc(e.target.result.toString()));
        props.dispatch(setImage(imgRef.current as HTMLImageElement));
      }
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, [props]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png"
  });

  return (
    <Div>
      <Dropzone {...getRootProps()}>
        <input {...getInputProps()} />
        {props.imageSrc === "" ? (
          <p>
            画像ファイル(png/jpg)をドロップ
            <br />
            またはクリックして読み込み
            <br />
          </p>
        ) : (
          <img ref={imgRef} src={props.imageSrc} alt="元画像" />
        )}
      </Dropzone>
    </Div>
  );
}

export default connect((state: AppState) => state)(SourceImage);
