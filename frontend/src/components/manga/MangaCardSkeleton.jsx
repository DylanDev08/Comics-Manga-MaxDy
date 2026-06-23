function MangaCardSkeleton() {
  return (
    <article className="manga-card manga-card--skeleton" aria-hidden="true">
      <div className="manga-card__cover skeleton-block" />
      <div className="manga-card__body">
        <div className="skeleton-line skeleton-line--short" />
        <div className="skeleton-line" />
        <div className="skeleton-line skeleton-line--short" />
      </div>
    </article>
  );
}

export default MangaCardSkeleton;
