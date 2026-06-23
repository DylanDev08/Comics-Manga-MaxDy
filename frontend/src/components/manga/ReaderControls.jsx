import { ChevronLeft, ChevronRight, Columns2, Rows3 } from "lucide-react";

function ReaderControls({ mode, onModeChange, previousTo, nextTo }) {
  return (
    <div className="reader-controls">
      <a className="button button--ghost" href={previousTo}>
        <ChevronLeft size={18} /> <span>Anterior</span>
      </a>
      <div className="segmented-control">
        <button className={mode === "vertical" ? "is-active" : ""} type="button" onClick={() => onModeChange("vertical")}>
          <Rows3 size={17} />
        </button>
        <button className={mode === "page" ? "is-active" : ""} type="button" onClick={() => onModeChange("page")}>
          <Columns2 size={17} />
        </button>
      </div>
      <a className="button button--primary" href={nextTo}>
        <span>Siguiente</span> <ChevronRight size={18} />
      </a>
    </div>
  );
}

export default ReaderControls;
