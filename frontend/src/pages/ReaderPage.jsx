import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import ReaderControls from "../components/manga/ReaderControls";
import { getReaderPages, mangas } from "../data/mockMangas";

function ReaderPage() {
  const { slug, chapterNumber } = useParams();
  const [mode, setMode] = useState("vertical");
  const [saved, setSaved] = useState(false);
  const manga = mangas.find((item) => item.slug === slug);
  const pages = useMemo(() => getReaderPages(slug, chapterNumber), [slug, chapterNumber]);
  const previousChapter = Math.max(Number(chapterNumber) - 1, 1);
  const nextChapter = Number(chapterNumber) + 1;

  return (
    <section className="reader">
      <div className="reader__heading">
        <p className="eyebrow">{manga?.title}</p>
        <h1>Capitulo {chapterNumber}</h1>
      </div>
      <ReaderControls
        mode={mode}
        onModeChange={setMode}
        previousTo={`/lector/${slug}/${previousChapter}`}
        nextTo={`/lector/${slug}/${nextChapter}`}
        onSaveProgress={() => {
          window.localStorage.setItem("maxdy-reading-progress", JSON.stringify({ slug, chapterNumber, pageNumber: 1 }));
          setSaved(true);
        }}
      />
      {saved ? <div className="reader__notice">Progreso guardado localmente. Backend listo en /api/v1/progress/:mangaId.</div> : null}
      <div className={`reader-pages reader-pages--${mode}`}>
        {pages.map((page) => (
          <img src={page.imageUrl} alt={`Pagina ${page.pageNumber}`} key={page.id} />
        ))}
      </div>
    </section>
  );
}

export default ReaderPage;
