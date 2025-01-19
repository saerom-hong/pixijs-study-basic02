import { Application, autoDetectRenderer, Container, Assets } from "pixi.js";
import { Visual } from "./visual";

(async () => {
  // create a renderer
  const renderer = await autoDetectRenderer({
    width: document.body.clientWidth,
    height: document.body.clientHeight,
    webgpu: {
      powerPreference: "high-performance",
    },
    webgl: {
      antialias: true,
      resolution: (window.devicePixelRatio >1) ? 2: 1,
      autoDensity: true,
      backgroundColor: 0xff4338,
    },
  });


  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ resizeTo: window });

  app.renderer = renderer;
  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  // Load Assets and stage
  const texture = await Assets.load("/assets/particle.png");
  const stage = new Container();

  // Initialize Visual instance
  const visual = new Visual();

  // Function to handle resizing
  const resize = () => {
    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;

    // Resize the renderer
    renderer.resize(stageWidth, stageHeight);

    // Update the visual dimensions
    visual.show(stage, texture);
  };

  // Function to handle animations
  const animate = () => {
    requestAnimationFrame(animate);

    // Update visuals and render the stage
    visual.animate();
    renderer.render(stage);
  };

  // Attach the resize event listener
  window.addEventListener("resize", resize, false);

  // Trigger an initial resize to set up dimensions
  resize();

  // Start the animation loop
  requestAnimationFrame(animate);
})();
