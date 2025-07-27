import React, { useRef, useEffect, useState } from "react";

export default function WhiteBoard({
  width = 1280,
  height = 720,
  pixelSize = 10,
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

  const drawPixel = (ctx, x, y) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  };

  const handleMouseDown = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    const pos = getMousePos(e);
    drawPixel(ctx, pos.x, pos.y);
    setMousePos(pos);
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    const currentPos = getMousePos(e);
    if (currentPos.x === mousePos.x && currentPos.y === mousePos.y) return; // No movement
    const dx = currentPos.x - mousePos.x;
    const dy = currentPos.y - mousePos.y;

    drawPixel(ctx, pos.x, pos.y);
    setMousePos(pos);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Optional: Draw grid
    ctx.strokeStyle = "#e5e7eb"; // Tailwind gray-200
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
    </div>
  );
}
