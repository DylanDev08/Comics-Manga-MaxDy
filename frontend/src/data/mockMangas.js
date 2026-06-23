export const genres = ["accion", "aventura", "drama", "fantasia", "sci-fi", "slice-of-life"];

export const mangas = [
  {
    id: "redline",
    slug: "redline-district",
    title: "Redline District",
    alternativeTitle: "Distrito Carmesi",
    description:
      "Una patrulla de repartidores nocturnos protege una ciudad dividida por tecnologia experimental y reglas de clanes urbanos.",
    coverUrl: "https://picsum.photos/seed/redline-cover/600/900",
    bannerUrl: "https://picsum.photos/seed/redline-banner/1400/600",
    status: "ONGOING",
    publicationStart: "2026-01-12",
    ranking: 1,
    score: 9.1,
    popularity: 9800,
    genres: ["accion", "sci-fi"],
    chapters: [
      { id: "r-1", number: 1, title: "Luces sobre el puente" },
      { id: "r-2", number: 2, title: "Entrega imposible" },
      { id: "r-3", number: 3, title: "Codigo rojo" },
    ],
  },
  {
    id: "papermoon",
    slug: "paper-moon-ronin",
    title: "Paper Moon Ronin",
    alternativeTitle: "Ronin de Luna de Papel",
    description:
      "Una aprendiz de caligrafia descubre que sus trazos pueden abrir puertas a regiones escondidas del viejo reino.",
    coverUrl: "https://picsum.photos/seed/papermoon-cover/600/900",
    bannerUrl: "https://picsum.photos/seed/papermoon-banner/1400/600",
    status: "ONGOING",
    publicationStart: "2025-09-04",
    ranking: 2,
    score: 8.8,
    popularity: 7600,
    genres: ["aventura", "fantasia"],
    chapters: [
      { id: "p-1", number: 1, title: "El pincel sellado" },
      { id: "p-2", number: 2, title: "Camino de tinta" },
    ],
  },
  {
    id: "kaiju",
    slug: "after-school-kaiju-club",
    title: "After School Kaiju Club",
    alternativeTitle: "Club Kaiju",
    description:
      "Un grupo de estudiantes administra un club escolar secreto dedicado a documentar criaturas gigantes pacificas.",
    coverUrl: "https://picsum.photos/seed/kaiju-cover/600/900",
    bannerUrl: "https://picsum.photos/seed/kaiju-banner/1400/600",
    status: "FINISHED",
    publicationStart: "2024-03-18",
    publicationEnd: "2025-12-20",
    ranking: 3,
    score: 8.4,
    popularity: 6100,
    genres: ["slice-of-life", "drama"],
    chapters: [
      { id: "k-1", number: 1, title: "Solicitud de club" },
      { id: "k-2", number: 2, title: "Huella en la cancha" },
    ],
  },
  {
    id: "noir",
    slug: "noir-signal",
    title: "Noir Signal",
    alternativeTitle: "Senal Noir",
    description:
      "Detectives adolescentes rastrean transmisiones imposibles en una ciudad donde la lluvia borra los recuerdos.",
    coverUrl: "https://picsum.photos/seed/noir-cover/600/900",
    bannerUrl: "https://picsum.photos/seed/noir-banner/1400/600",
    status: "UPCOMING",
    publicationStart: "2026-08-01",
    ranking: 4,
    score: 0,
    popularity: 4100,
    genres: ["drama", "sci-fi"],
    chapters: [{ id: "n-0", number: 0, title: "Prologo" }],
  },
];

export const comments = [
  {
    id: "c1",
    user: "Akari",
    role: "USER",
    content: "El giro del capitulo 2 de Redline quedo tremendo.",
    likes: 18,
    replies: [{ id: "c1-r1", user: "MaxDy", content: "Y todavia falta la ruta del tunel." }],
  },
  {
    id: "c2",
    user: "NoirReader",
    role: "MODERATOR",
    content: "Recuerden marcar spoilers cuando hablen de finales.",
    likes: 31,
    replies: [],
  },
];

export const getReaderPages = (slug, chapterNumber) =>
  [1, 2, 3, 4, 5].map((pageNumber) => ({
    id: `${slug}-${chapterNumber}-${pageNumber}`,
    pageNumber,
    imageUrl: `https://picsum.photos/seed/${slug}-${chapterNumber}-${pageNumber}/900/1300`,
  }));
