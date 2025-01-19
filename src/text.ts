export class Text {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    // this.canvas.style.position = 'absolute';
    // this.canvas.style.left = '0';
    // this.canvas.style.top = '0';
    // document.body.appendChild(this.canvas);

    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error("Unable to get 2D context");
    }
    this.ctx = context; // Now TypeScript knows `ctx` is not null
  }

  setText(str: string, density: number, stageWidth: number, stageHeight: number) {
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    const myText = str;
    const fontWidth = 700;
    const fontSize = 800;
    const fontName = 'Sans Serif';

    this.ctx?.clearRect(0,0,stageWidth, stageHeight);
    this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    this.ctx.fillStyle = `rgb(255, 255, 0)`;
    this.ctx.textBaseline = `middle`;
    const fontPos = this.ctx?.measureText(myText);
    this.ctx?.fillText(
      myText,
      (stageWidth - fontPos.width) / 2,
      fontPos?.actualBoundingBoxAscent +
      fontPos?.actualBoundingBoxDescent +
      ((stageHeight - fontSize) / 2)
    );

    return this.dotPos(density, stageWidth, stageHeight);
  }

  dotPos(density: number, stageWidth: number, stageHeight: number) {
    const imageData = this.ctx.getImageData(
      0, 0,
      stageWidth, stageHeight
    ).data;

    const particles = [];
    let i = 0;
    let width = 0;
    let pixel;

    for(let height = 0; height < stageHeight; height += density) {
      ++i;
      const slide = (i % 2) == 0;
      width = 0;
      if(slide) {
        width += 2;
      }

      for(width; width <stageWidth; width +=density) {
        pixel = imageData[((width + (height * stageWidth)) * 4) -1];
        if(pixel != 0 &&
          width > 0 &&
          width < stageWidth &&
          height > 0 &&
          height < stageHeight) {
            particles.push({
              x: width,
              y: height,
            });
          }
      }
    }

    return particles;
  }
}