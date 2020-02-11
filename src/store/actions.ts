import { createActionCreator } from "deox";

export const setImage= createActionCreator(
  "SET_IMAGE",
  resolve => (imageSrc: HTMLImageElement) => resolve(imageSrc)
);
export const setImageSrc = createActionCreator(
  "SET_IMAGE_SRC",
  resolve => (imageSrc: string) => resolve(imageSrc)
);
export const setFrameWidth = createActionCreator(
  "SET_FRAME_WIDTH",
  resolve => (frameWidth: number) => resolve(frameWidth)
);
export const setFrameHeight = createActionCreator(
  "SET_FRAME_HEIGHT",
  resolve => (frameHeight: number) => resolve(frameHeight)
);
export const setFrameTime = createActionCreator(
  "SET_FRAME_TIME",
  resolve => (frameTime: number) => resolve(frameTime)
);
export const setTotalFrames = createActionCreator(
  "SET_TOTAL_FRAMES",
  resolve => (totalFrames: number) => resolve(totalFrames)
);
export const setFadeInEnabled = createActionCreator(
  "SET_FADE_IN_ENABLED",
  resolve => (fadeInEnabled: boolean) => resolve(fadeInEnabled)
);
export const setFadeInSpeed = createActionCreator(
  "SET_FADE_IN_SPEED",
  resolve => (fadeInSpeed: number) => resolve(fadeInSpeed)
);
export const setFadeOutEnabled = createActionCreator(
  "SET_FADE_OUT_ENABLED",
  resolve => (fadeOutEnabled: boolean) => resolve(fadeOutEnabled)
);
export const setFadeOutSpeed = createActionCreator(
  "SET_FADE_OUT_SPEED",
  resolve => (fadeOutSpeed: number) => resolve(fadeOutSpeed)
);
