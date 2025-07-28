import React from "react";
import WhiteBoard from "../components/WhiteBoard";

export default function Dashboard() {
  const [scale, setScale] = React.useState(1);
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
              step="1"
              value={scale}
              onChange={(e) => setScale(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="flex-1 bg-amber-300 items-center justify-center p-2 m-2 w-fit h-fit">
        <WhiteBoard className="cursor-none" />
      </div>
    </div>
  );
}
