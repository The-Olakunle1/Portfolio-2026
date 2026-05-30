const CELL = 64;
const COLS = 23;
const ROWS = 4;
const highlighted = new Set(["0-9", "0-14", "1-7", "1-13", "2-5", "2-12", "2-18", "3-3", "3-8"]);

export default function GridBackground() {
  return (
    <div
      className="passkey-grid"
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: COLS * CELL,
        pointerEvents: "none",
        opacity: 0.6,
      }}
    >
      {Array.from({ length: ROWS }, (_, row) => (
        <div key={row} style={{ display: "flex" }}>
          {Array.from({ length: COLS }, (_, col) => (
            <div
              key={col}
              style={{
                width: CELL,
                height: CELL,
                flexShrink: 0,
                borderRight: "1px solid #d0d5dd",
                borderBottom: "1px solid #d0d5dd",
                background: highlighted.has(`${row}-${col}`) ? "#e8edf5" : "transparent",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
