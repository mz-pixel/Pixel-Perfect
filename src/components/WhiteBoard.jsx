import React, { useRef, useEffect, useState } from "react";

export default function WhiteBoard({
  width = 1280,
  height = 720,
  pixelSize = 16,
  brushColor = "#000000",
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const getMousePos = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: Math.floor((event.clientX - rect.left) / pixelSize),
      y: Math.floor((event.clientY - rect.top) / pixelSize),
    };
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const drawPixel = (ctx, x, y) => {
    ctx.fillStyle = brushColor;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  };

  const handleMouseDown = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    const pos = getMousePos(e);
    drawPixel(ctx, pos.x, pos.y);
    setMousePos(pos);
    setIsDrawing(true);
  };

  const drawLineBresenham = (
    ctx,
    mousePosx,
    mousePosy,
    currentPosx,
    currentPosy,
    dx,
    dy,
    drawPixel
  ) => {
    const signx = mousePosx < currentPosx ? 1 : -1;
    const signy = mousePosy < currentPosy ? 1 : -1;
    let err = dx - dy;

    while (true) {
      drawPixel(ctx, mousePosx, mousePosy);

      if (mousePosx === currentPosx && mousePosy === currentPosy) break;
      const err2 = 2 * err;

      if (err2 > -dy) {
        err -= dy;
        mousePosx += signx;
      }

      if (err2 < dx) {
        err += dx;
        mousePosy += signy;
      }
    }
  };
  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    const currentPos = getMousePos(e);
    const dx = Math.abs(currentPos.x - mousePos.x);
    const dy = Math.abs(currentPos.y - mousePos.y);

    if (currentPos.x !== mousePos.x || currentPos.y !== mousePos.y) {
      drawLineBresenham(
        ctx,
        mousePos.x,
        mousePos.y,
        currentPos.x,
        currentPos.y,
        dx,
        dy,
        drawPixel
      );
      setMousePos(currentPos);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#e5e7eb";
    for (let x = 0; x < width; x += pixelSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += pixelSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }, [width, height, pixelSize]);

  return (
    <div className="flex justify-center items-center p-4">
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-400 cursor-crosshair shadow-lg rounded"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
}
