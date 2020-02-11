import { AppState } from "../store/reducer";

// 誤差のあまり出ない四捨五入
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/round#A_better_solution
function round(n: number, precision: number) {
  var shift = function(n: number, precision: number, reverseShift: boolean) {
    if (reverseShift) {
      precision = -precision;
    }
    var numArray = ("" + n).split("e");
    return +(
      numArray[0] +
      "e" +
      (numArray[1] ? +numArray[1] + precision : precision)
    );
  };
  return shift(Math.round(shift(n, precision, false)), precision, true);
}

class GlyphFrame {
  public x: number = 0;
  public width: number = 0;
  public alpha: number = 1;
  public rotate: number = 0;

  public constructor(index: number, props: AppState) {
    this.x = props.frameWidth * index;
    this.width = props.frameWidth;
    this.applyAlpha(index, props);
  }

  private applyAlpha(index: number, props: AppState) {
    let alpha = 1.0;
    // fadein
    if (props.fadeInEnabled) {
      const fadeInEndIndex = Math.floor(
        (props.totalFrames - 1) * (props.fadeInSpeed / 100)
      );
      if (index <= fadeInEndIndex) {
        const fadeInPhase = index / fadeInEndIndex;
        alpha *= fadeInPhase;
      }
    }
    // fadeout
    if (props.fadeOutEnabled) {
      const fadeOutTotalFrames = Math.floor(
        props.totalFrames * (props.fadeOutSpeed / 100)
      );
      const fadeOutStartIndex = props.totalFrames - fadeOutTotalFrames - 1;
      if (fadeOutStartIndex <= index) {
        const fadeOutPhase = (index - fadeOutStartIndex) / fadeOutTotalFrames;
        alpha *= 1 - fadeOutPhase;
      }
    }
    this.alpha = round(alpha, 2);
  }
}

export default class GlyphCanvasMng {
  public visible: boolean = false;
  private _canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private props: AppState | null = null;
  private frames: GlyphFrame[] = [];

  public init(
    div: HTMLDivElement | null,
    canvas: HTMLCanvasElement | null,
    props: AppState
  ): void {
    // console.log("GlyphCanvasMng init", props);
    if (canvas == null) {
      return;
    }
    this.reset();
    if (props.imageSrc == null || props.imageSrc === "") {
      return;
    }
    this._canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.props = { ...props };
    this._canvas.width = props.frameWidth * props.totalFrames;
    this._canvas.height = props.frameHeight;
    if (div != null) {
      div.style.height = `${this._canvas.height + 20}px`;
    }
    props.image.onload = () => {
      this.draw();
    };
    this.genFrames();
    this.draw();
    this._canvas.style.display = "block";
    this.visible = true;
  }

  public reset(): void {
    if (this._canvas != null && this.context != null) {
      this.context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
    this.frames = [];
  }

  public genFrames(): void {
    if (this.props == null) {
      return;
    }
    const frames: GlyphFrame[] = (this.frames = []);
    const props = this.props;
    for (let i = 0; i < props.totalFrames; i++) {
      const frame = new GlyphFrame(i, props);
      frames.push(frame);
    }
  }

  public draw(): void {
    if (this._canvas == null || this.context == null || this.props == null) {
      return;
    }
    const canvas = this._canvas;
    const context = this.context;
    const props = this.props;

    context.globalAlpha = 1.0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    this.frames.forEach(frame => {
      context.globalAlpha = frame.alpha;
      context.drawImage(
        props.image,
        frame.x,
        0,
        props.frameWidth,
        props.frameHeight
      );
    });
  }

  public get canvas(): HTMLCanvasElement | null {
    return this._canvas;
  }

  public toDataUrl(): string | null {
    if (this.canvas != null) {
      return this.canvas.toDataURL("image/png");
    } else {
      return null;
    }
  }

  public genScript(): any {
    const ponFrames: any[] = this.frames.map(frame => ({
      x: frame.x,
      y: 0
      // alpha: 1
    }));
    return ponFrames;
  }
}
