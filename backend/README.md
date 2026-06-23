# Manga MaxDy API

API Express modular preparada para Supabase PostgreSQL mediante Prisma.

## Scripts

```bash
npm run dev
npm start
npm run check
npm run prisma:generate
npm run prisma:migrate
npm run prisma:deploy
npm run db:seed
```

## Variables

Copiar `.env.example` a `.env` y completar:

- `DATABASE_URL`: connection string de Supabase PostgreSQL.
- `JWT_SECRET`: secreto largo para firmar sesiones.
- `CLIENT_URL` y `CORS_ORIGIN`: URL del frontend.
- `COOKIE_NAME`: nombre de cookie HttpOnly.

## Endpoints principales

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `GET /api/v1/mangas`
- `GET /api/v1/mangas/:slug`
- `GET /api/v1/mangas/:slug/chapters`
- `GET /api/v1/chapters/:chapterId`
- `GET /api/v1/rankings`
- `GET /api/v1/users/me`
- `GET /api/v1/users/me/library`
- `GET /api/v1/users/me/favorites`
- `POST /api/v1/favorites/:mangaId`
- `PATCH /api/v1/progress/:mangaId`
- `GET /api/v1/mangas/:mangaId/comments`
- `POST /api/v1/mangas/:mangaId/comments`
- `POST /api/v1/comments/:commentId/replies`
- `POST /api/v1/comments/:commentId/like`
- `POST /api/v1/comments/:commentId/report`
