import type { CSSProperties } from "react";

const COLORS = [
  "#F6A39C",
  "#F8D27A",
  "#9FD9EE",
  "#A9DFC5",
  "#C9B8EE",
  "#F7B58F",
] as const;

const PIECES = Array.from({ length: 54 }, (_, index) => ({
  id: index,
  color: COLORS[index % COLORS.length],
  left: 3 + ((index * 19) % 94),
  delay: (index % 9) * 0.055,
  drift: ((index % 11) - 5) * 16,
  rotation: (index * 53) % 360,
}));

export default function ConfettiOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
      aria-hidden="true"
    >
      {PIECES.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece absolute top-[-4%] h-3.5 w-2.5 rounded-sm"
          style={
            {
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
              "--confetti-x": `${piece.drift}px`,
              "--confetti-rotate": `${piece.rotation}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
