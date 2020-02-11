import { createReducer } from "deox";
import * as Actions from "./actions";
import { Dispatch } from "redux";

export interface DefaultState {
  dispatch: Dispatch;
}

export interface State {
  image: HTMLImageElement;
  imageSrc: string;
  frameWidth: number;
  frameHeight: number;
  frameTime: number;
  totalFrames: number;
  fadeInEnabled: boolean;
  fadeInSpeed: number;
  fadeOutEnabled: boolean;
  fadeOutSpeed: number;
}

export type AppState = DefaultState & State;

const initialState: State = {
  image: new Image(),
  imageSrc: "",
  frameWidth: 24,
  frameHeight: 24,
  frameTime: 50,
  totalFrames: 20,
  fadeInEnabled: true,
  fadeInSpeed: 50,
  fadeOutEnabled: true,
  fadeOutSpeed: 50
};

export const Reducer = createReducer(initialState, handleAction => [
  handleAction(Actions.setImage, (state, action) => ({
    ...state,
    image: action.payload
  })),
  handleAction(Actions.setImageSrc, (state, action) => ({
    ...state,
    imageSrc: action.payload
  })),
  handleAction(Actions.setFrameWidth, (state, action) => ({
    ...state,
    frameWidth: action.payload
  })),
  handleAction(Actions.setFrameHeight, (state, action) => ({
    ...state,
    frameHeight: action.payload
  })),
  handleAction(Actions.setFrameTime, (state, action) => ({
    ...state,
    frameTime: action.payload
  })),
  handleAction(Actions.setTotalFrames, (state, action) => ({
    ...state,
    totalFrames: action.payload
  })),
  handleAction(Actions.setFadeInEnabled, (state, action) => ({
    ...state,
    fadeInEnabled: action.payload
  })),
  handleAction(Actions.setFadeInSpeed, (state, action) => ({
    ...state,
    fadeInSpeed: action.payload
  })),
  handleAction(Actions.setFadeOutEnabled, (state, action) => ({
    ...state,
    fadeOutEnabled: action.payload
  })),
  handleAction(Actions.setFadeOutSpeed, (state, action) => ({
    ...state,
    fadeOutSpeed: action.payload
  }))
]);
