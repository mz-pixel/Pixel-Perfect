import React, { useEffect, useRef } from "react";

export default function WhiteBoard(props) {
  const downloadLogic = (params) => {
    return params;
  };
  const { draw, ...rest } = props;
  const { scale, ...propsWithoutScale } = rest;

  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;
    const render = () => {
      // increases frame count on a sin function to create an oscillating effect on the circle
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      // need to clear animation if the component isnt being rendered
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <div className="canvas-holder">
      <div className="topbar">
        <button className="download-button" onClick={downloadLogic}>
          Download
        </button>
      </div>
      <p>this is the last test</p>
      {/* <div className="container size-fit m-8 p-8 bg-white"> */}
      <div className="container size-fit m-8 p-8 bg-red-700">
        <canvas
          id="canvas"
          className="cursor-none bg-amber-300"
          ref={canvasRef}
          {...propsWithoutScale}
        ></canvas>
      </div>
    </div>
  );
}
