import { Zap } from "lucide-react";
import { useState } from "react";

function LoadingScreen() {
  const [boost, setBoost] = useState(false);

  return (
    <div className={`loading-screen ${boost ? "is-boosted" : ""}`} role="status" aria-live="polite">
      <div className="loading-screen__orbit">
        <span className="chibi chibi--one"><i /><b>Nika</b></span>
        <span className="chibi chibi--two"><i /><b>Ria</b></span>
        <span className="chibi chibi--three"><i /><b>Aka</b></span>
        <span className="chibi chibi--four"><i /><b>Suna</b></span>
        <span className="chibi chibi--five"><i /><b>Miko</b></span>
      </div>
      <div className="loading-screen__panel">
        <span className="loading-screen__chapter">Loading Webtoon...</span>
        <p>El quinteto esta preparando paneles, tinta digital y energia de capitulo nuevo.</p>
        <button className="loading-screen__boost" type="button" onClick={() => setBoost((current) => !current)}>
          <Zap size={18} /> Boost
        </button>
        <div className="loading-screen__bar" />
      </div>
    </div>
  );
}

export default LoadingScreen;
