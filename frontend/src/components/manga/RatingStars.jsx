import { Star } from "lucide-react";
import { useState } from "react";

function RatingStars({ initialScore = 0, onRate }) {
  const [score, setScore] = useState(Math.round(initialScore));
  const [hovered, setHovered] = useState(0);

  const chooseScore = (nextScore) => {
    setScore(nextScore);
    onRate?.(nextScore);
  };

  return (
    <div className="rating-stars" aria-label="Puntuar manga">
      {Array.from({ length: 10 }, (_, index) => {
        const value = index + 1;
        const active = value <= (hovered || score);

        return (
          <button
            key={value}
            type="button"
            className={active ? "is-active" : ""}
            onClick={() => chooseScore(value)}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`Puntuar ${value} de 10`}
          >
            <Star size={18} fill={active ? "currentColor" : "none"} />
          </button>
        );
      })}
      <span>{score || initialScore}/10</span>
    </div>
  );
}

export default RatingStars;
