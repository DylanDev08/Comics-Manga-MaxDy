import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import LoadingScreen from "../components/common/LoadingScreen";
import AdminPage from "../pages/AdminPage";
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
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setBooting(false), 900);
    return () => window.clearTimeout(timeout);
  }, []);

  if (booting) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/mangas/:slug" element={<MangaDetailPage />} />
        <Route path="/lector/:slug/:chapterNumber" element={<ReaderPage />} />
        <Route path="/foro/:slug" element={<ForumPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/registro" element={<AuthPage mode="register" />} />
        <Route path="/recuperar-password" element={<AuthPage mode="forgot" />} />
        <Route path="/reset-password" element={<AuthPage mode="reset" />} />
        <Route path="/verificar-email" element={<AuthPage mode="verify" />} />
        <Route path="/explorar" element={<Navigate to="/catalogo" replace />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/usuario/:section?" element={<UserDashboardPage />} />
          <Route path="/perfil" element={<Navigate to="/usuario/perfil" replace />} />
          <Route path="/biblioteca" element={<Navigate to="/usuario/biblioteca" replace />} />
          <Route path="/favoritos" element={<Navigate to="/usuario/favoritos" replace />} />
          <Route path="/historial" element={<Navigate to="/usuario/historial" replace />} />
          <Route path="/configuracion" element={<Navigate to="/usuario/configuracion" replace />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
          <Route path="/admin/:section?" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
