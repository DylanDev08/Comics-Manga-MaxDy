import { Edit3, Plus, Shield, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import Button from "../components/common/Button";
import { genres as mockGenres, mangas as mockMangas } from "../data/mockMangas";

const initialForm = {
  title: "",
  type: "MANGA",
  status: "PUBLISHING",
  score: 0,
  coverUrl: "",
};

const initialChapterForm = {
  mangaId: "",
  title: "",
  number: 1,
  pageUrl: "",
};

function AdminPage() {
  const { section = "dashboard" } = useParams();
  const [mangas, setMangas] = useState(mockMangas);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [notice, setNotice] = useState("");
  const [genres, setGenres] = useState(mockGenres);
  const [genreName, setGenreName] = useState("");
  const [chapterForm, setChapterForm] = useState(initialChapterForm);
  const [reportedComments, setReportedComments] = useState([
    { id: "report-1", reason: "spoiler sin aviso", status: "REPORTED", content: "El final del capitulo revela demasiado." },
    { id: "report-2", reason: "spam", status: "REPORTED", content: "Link repetido en varios hilos." },
  ]);

  const stats = useMemo(
    () => ({
      mangas: mangas.length,
      chapters: mangas.reduce((total, manga) => total + manga.chapters.length, 0),
      comments: 18,
      reports: 2,
    }),
    [mangas]
  );

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const saveManga = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setNotice("El titulo es obligatorio.");
      return;
    }

    if (editingId) {
      setMangas((items) => items.map((item) => (item.id === editingId ? { ...item, ...form } : item)));
      setNotice("Manga actualizado.");
    } else {
      const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      setMangas((items) => [
        {
          ...form,
          id: `local-${Date.now()}`,
          slug,
          alternativeTitle: "",
          description: "Descripcion temporal preparada para completar desde backend.",
          bannerUrl: form.coverUrl || "https://picsum.photos/seed/admin-banner/1400/600",
          popularity: 0,
          ranking: items.length + 1,
          genres: ["accion"],
          chapters: [],
        },
        ...items,
      ]);
      setNotice("Manga creado.");
    }

    setForm(initialForm);
    setEditingId(null);
  };

  const editManga = (manga) => {
    setEditingId(manga.id);
    setForm({
      title: manga.title,
      type: manga.type,
      status: manga.status,
      score: manga.score,
      coverUrl: manga.coverUrl,
    });
  };

  const confirmDelete = () => {
    setMangas((items) => items.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
    setNotice("Manga eliminado.");
  };

  const saveChapter = (event) => {
    event.preventDefault();

    if (!chapterForm.mangaId || !chapterForm.title.trim()) {
      setNotice("Selecciona un manga y escribi un titulo de capitulo.");
      return;
    }

    setMangas((items) =>
      items.map((manga) =>
        manga.id === chapterForm.mangaId
          ? {
              ...manga,
              chapters: [
                ...manga.chapters,
                {
                  id: `chapter-${Date.now()}`,
                  number: Number(chapterForm.number),
                  title: chapterForm.title,
                  pages: chapterForm.pageUrl ? [{ pageNumber: 1, imageUrl: chapterForm.pageUrl }] : [],
                },
              ],
            }
          : manga
      )
    );
    setChapterForm(initialChapterForm);
    setNotice("Capitulo creado.");
  };

  return (
    <section className="admin-page page-section page-section--top">
      <aside className="user-sidebar">
        <div className="user-avatar"><Shield size={22} /></div>
        <strong>Admin</strong>
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/mangas">Mangas</NavLink>
        <NavLink to="/admin/capitulos">Capitulos</NavLink>
        <NavLink to="/admin/generos">Generos</NavLink>
        <NavLink to="/admin/comentarios">Reportes</NavLink>
      </aside>

      <div className="admin-content">
        <p className="eyebrow">Panel admin</p>
        <h1>{section}</h1>
        {notice ? <div className="notice">{notice}</div> : null}

        {section === "dashboard" ? (
          <div className="admin-stats">
            <span><strong>{stats.mangas}</strong> Mangas</span>
            <span><strong>{stats.chapters}</strong> Capitulos</span>
            <span><strong>{stats.comments}</strong> Comentarios</span>
            <span><strong>{stats.reports}</strong> Reportes</span>
          </div>
        ) : null}

        {section === "mangas" ? (
          <>
            <form className="admin-form" onSubmit={saveManga}>
              <input value={form.title} onChange={(event) => updateField("title", event.target.value)} placeholder="Titulo" />
              <select value={form.type} onChange={(event) => updateField("type", event.target.value)}>
                <option value="MANGA">Manga</option>
                <option value="MANHWA">Manhwa</option>
                <option value="MANHUA">Manhua</option>
                <option value="COMIC">Comic</option>
              </select>
              <select value={form.status} onChange={(event) => updateField("status", event.target.value)}>
                <option value="PUBLISHING">En emision</option>
                <option value="FINISHED">Finalizado</option>
                <option value="PAUSED">Pausado</option>
                <option value="CANCELLED">Cancelado</option>
                <option value="UPCOMING">Proximamente</option>
              </select>
              <input value={form.coverUrl} onChange={(event) => updateField("coverUrl", event.target.value)} placeholder="URL de portada autorizada" />
              <Button type="submit" icon={Plus}>{editingId ? "Guardar cambios" : "Crear manga"}</Button>
            </form>

            <div className="admin-table">
              {mangas.map((manga) => (
                <article key={manga.id}>
                  <img src={manga.coverUrl} alt="" />
                  <div>
                    <strong>{manga.title}</strong>
                    <span>{manga.type} · {manga.status} · {manga.chapters.length} caps</span>
                  </div>
                  <button type="button" onClick={() => editManga(manga)}><Edit3 size={17} /></button>
                  <button type="button" onClick={() => setDeleteTarget(manga)}><Trash2 size={17} /></button>
                </article>
              ))}
            </div>
          </>
        ) : null}

        {section === "capitulos" ? (
          <>
            <form className="admin-form" onSubmit={saveChapter}>
              <select value={chapterForm.mangaId} onChange={(event) => setChapterForm((current) => ({ ...current, mangaId: event.target.value }))}>
                <option value="">Seleccionar manga</option>
                {mangas.map((manga) => <option key={manga.id} value={manga.id}>{manga.title}</option>)}
              </select>
              <input type="number" min="1" value={chapterForm.number} onChange={(event) => setChapterForm((current) => ({ ...current, number: event.target.value }))} />
              <input value={chapterForm.title} onChange={(event) => setChapterForm((current) => ({ ...current, title: event.target.value }))} placeholder="Titulo del capitulo" />
              <input value={chapterForm.pageUrl} onChange={(event) => setChapterForm((current) => ({ ...current, pageUrl: event.target.value }))} placeholder="URL de pagina autorizada" />
              <Button type="submit" icon={Plus}>Crear capitulo</Button>
            </form>
            <div className="admin-table">
              {mangas.flatMap((manga) =>
                manga.chapters.map((chapter) => (
                  <article key={chapter.id}>
                    <span className="admin-table__marker">C</span>
                    <div>
                      <strong>{manga.title}</strong>
                      <span>Capitulo {chapter.number}: {chapter.title}</span>
                    </div>
                    <Button to={`/lector/${manga.slug}/${chapter.number}`} variant="ghost">Previsualizar</Button>
                  </article>
                ))
              )}
            </div>
          </>
        ) : null}

        {section === "generos" ? (
          <>
            <form
              className="admin-form admin-form--compact"
              onSubmit={(event) => {
                event.preventDefault();
                if (genreName.trim().length < 2) {
                  setNotice("El genero debe tener al menos 2 caracteres.");
                  return;
                }
                setGenres((items) => [...items, genreName.trim().toLowerCase()]);
                setGenreName("");
                setNotice("Genero agregado.");
              }}
            >
              <input value={genreName} onChange={(event) => setGenreName(event.target.value)} placeholder="Nuevo genero" />
              <Button type="submit" icon={Plus}>Agregar</Button>
            </form>
            <div className="tag-list tag-list--admin">
              {genres.map((genre) => <span key={genre}>{genre}</span>)}
            </div>
          </>
        ) : null}

        {section === "comentarios" ? (
          <div className="admin-table">
            {reportedComments.map((comment) => (
              <article key={comment.id}>
                <span className="admin-table__marker">!</span>
                <div>
                  <strong>{comment.content}</strong>
                  <span>Motivo: {comment.reason} · Estado: {comment.status}</span>
                </div>
                <button type="button" onClick={() => setReportedComments((items) => items.map((item) => item.id === comment.id ? { ...item, status: "HIDDEN" } : item))}>Ocultar</button>
                <button type="button" onClick={() => setReportedComments((items) => items.filter((item) => item.id !== comment.id))}>Resolver</button>
              </article>
            ))}
          </div>
        ) : null}
      </div>

      {deleteTarget ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="confirm-modal">
            <h2>Eliminar manga</h2>
            <p>Esta accion no se puede deshacer cuando este conectada al backend.</p>
            <div className="hero__actions">
              <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancelar</Button>
              <Button onClick={confirmDelete}>Eliminar</Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default AdminPage;
