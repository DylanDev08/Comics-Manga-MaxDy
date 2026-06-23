function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-screen__panel">
        <span className="loading-screen__chapter">Loading chapter</span>
        <div className="loading-screen__bar" />
      </div>
    </div>
  );
}

export default LoadingScreen;
