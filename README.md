# Comics-Manga-MaxDy

Proyecto full stack para portfolio: plataforma de mangas con frontend React/Vite y backend Node.js/Express + Prisma + PostgreSQL/Supabase.

## Estructura

- `frontend`: app React con arquitectura modular, rutas, datos mock, servicios API y estilos manga/comics negro-rojo.
- `backend`: API Express modular con auth, usuarios, mangas, capitulos, favoritos, biblioteca, progreso, rankings, comentarios y admin.

## Desarrollo local

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
npm run dev
```

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Deploy

Backend en Railway:

- Root directory: `backend`
- Build command: `npm ci && npm run prisma:generate && npm run prisma:deploy`
- Start command: `npm start`
- Healthcheck: `/health`
- Variables: `DATABASE_URL`, `JWT_SECRET`, `CLIENT_URL`, `CORS_ORIGIN`, `COOKIE_NAME`, `NODE_ENV=production`
- Para crear admin por seed: `ADMIN_SEED_EMAIL` y `ADMIN_SEED_PASSWORD`

Frontend en Vercel:

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Variable: `VITE_API_URL=https://tu-backend.railway.app/api/v1`

## Seguridad

- Las operaciones sensibles pasan por backend.
- Auth usa cookies HttpOnly y tambien soporta Bearer token para clientes no navegador.
- Prisma evita concatenar SQL manual con datos de usuario.
- `.env.example` documenta variables sin exponer secretos.
- El contenido mock usa datos e imagenes de prueba; el lector esta preparado para obras propias o autorizadas.
- El seed no hardcodea credenciales admin: si faltan `ADMIN_SEED_EMAIL` o `ADMIN_SEED_PASSWORD`, omite la creacion del admin.

## Funcionalidades

- Frontend con home, catalogo amplio, ranking, detalle, lector webtoon, foro vivo, auth validado, menu de cuenta, ajustes de usuario, rutas protegidas y panel admin visual.
- Backend con `/api/v1/admin/*`, comentarios por manga/capitulo, ratings, rate limit en auth/comentarios y roles `USER`, `MODERATOR`, `ADMIN`.
- Si el backend no esta levantado, login/register activan una sesion demo en memoria para probar la UI de portfolio sin guardar tokens en `localStorage`.
