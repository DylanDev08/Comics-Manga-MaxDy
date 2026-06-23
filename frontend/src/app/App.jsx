import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AuthPage from "../pages/AuthPage";
import CatalogPage from "../pages/CatalogPage";
import ForumPage from "../pages/ForumPage";
import HomePage from "../pages/HomePage";
import MangaDetailPage from "../pages/MangaDetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import RankingPage from "../pages/RankingPage";
import ReaderPage from "../pages/ReaderPage";
import UserDashboardPage from "../pages/UserDashboardPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/mangas/:slug" element={<MangaDetailPage />} />
        <Route path="/lector/:slug/:chapterNumber" element={<ReaderPage />} />
        <Route path="/foro/:slug" element={<ForumPage />} />
        <Route path="/usuario/:section?" element={<UserDashboardPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/registro" element={<AuthPage mode="register" />} />
        <Route path="/recuperar-password" element={<AuthPage mode="forgot" />} />
        <Route path="/reset-password" element={<AuthPage mode="reset" />} />
        <Route path="/verificar-email" element={<AuthPage mode="verify" />} />
        <Route path="/explorar" element={<Navigate to="/catalogo" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
