import { ChevronLeft, ChevronRight, Columns2, Rows3 } from "lucide-react";
import { Link } from "react-router-dom";

function ReaderControls({ mode, onModeChange, previousTo, nextTo, onSaveProgress }) {
  return (
    <div className="reader-controls">
      <Link className="button button--ghost" to={previousTo}>
        <ChevronLeft size={18} /> <span>Anterior</span>
      </Link>
      <div className="segmented-control">
        <button className={mode === "vertical" ? "is-active" : ""} type="button" onClick={() => onModeChange("vertical")}>
          <Rows3 size={17} />
        </button>
        <button className={mode === "page" ? "is-active" : ""} type="button" onClick={() => onModeChange("page")}>
          <Columns2 size={17} />
        </button>
      </div>
      <button className="button button--ghost" type="button" onClick={onSaveProgress}>
        Guardar progreso
      </button>
      <Link className="button button--primary" to={nextTo}>
        <span>Siguiente</span> <ChevronRight size={18} />
      </Link>
    </div>
  );
}

export default ReaderControls;
