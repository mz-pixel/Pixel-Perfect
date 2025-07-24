import React from "react";
import WhiteBoard from "../components/WhiteBoard";

export default function Dashboard() {
  const [mouseDown, setMouseDown] = React.useState(false);
  const [scale, setScale] = React.useState(1);
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const handleMouseDown = (e) => {
    console.log("Mouse down event:", e);
    console.log("Mouse down at", e.clientX, e.clientY);
    setMouseDown(true);
    console.log("Mouse down state:", mouseDown);
  };

  const handleMouseUp = () => {
    console.log("Mouse up");

    setMouseDown(false);
    console.log("Mouse down state:", mouseDown);
  };

  const handleMouseEnter = (e) => {
    console.log("Mouse enter event:", e);
    if (!mouseDown) {
      console.log("Mouse entered while not pressed");
    }
  };

  return (
    <div className="min-h-screen flex flex-row">
      <div className="colour-palette">
        <div className="scale-setter">
          <form action="/action_page.php">
            <label htmlFor="scale">Scale (between 1 and 5):</label>
            <input
              type="range"
              id="scale"
              name="scale"
              min="1"
              max="100"
              step={(scale + 1) ** 2}
              value={scale}
              onChange={(e) => setScale(e.target.value)}
            />
          </form>
        </div>
      </div>
      <WhiteBoard
        draw={draw}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        mouseDown={mouseDown}
        scale={scale}
        width={1280}
        height={720}
        pixelSize={10}
        className="cursor-none bg-amber-300"
        style={{ width: "1280px", height: "720px" }}
      />
    </div>
  );
}
