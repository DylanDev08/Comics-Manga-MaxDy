require("dotenv").config();

const prisma = require("../src/config/prisma");
const { hashPassword } = require("../src/utils/hash");

const genres = [
  ["Accion", "accion"],
  ["Aventura", "aventura"],
  ["Drama", "drama"],
  ["Fantasia", "fantasia"],
  ["Sci-Fi", "sci-fi"],
  ["Slice of Life", "slice-of-life"],
];

const mangas = [
  {
    title: "Redline District",
    slug: "redline-district",
    alternativeTitle: "Distrito Carmesi",
    description:
      "Una patrulla de repartidores nocturnos protege una ciudad dividida por tecnologia experimental y reglas de clanes urbanos.",
    author: "MaxDy Studio",
    status: "ONGOING",
    score: 9.1,
    ranking: 1,
    popularity: 9800,
    coverUrl: "https://picsum.photos/seed/redline-cover/600/900",
    bannerUrl: "https://picsum.photos/seed/redline-banner/1400/600",
    genreSlugs: ["accion", "sci-fi"],
  },
  {
    title: "Paper Moon Ronin",
    slug: "paper-moon-ronin",
    alternativeTitle: "Ronin de Luna de Papel",
    description:
      "Una aprendiz de caligrafia descubre que sus trazos pueden abrir puertas a regiones escondidas del viejo reino.",
    author: "MaxDy Studio",
    status: "ONGOING",
    score: 8.8,
    ranking: 2,
    popularity: 7600,
    coverUrl: "https://picsum.photos/seed/papermoon-cover/600/900",
    bannerUrl: "https://picsum.photos/seed/papermoon-banner/1400/600",
    genreSlugs: ["aventura", "fantasia"],
  },
  {
    title: "After School Kaiju Club",
    slug: "after-school-kaiju-club",
    alternativeTitle: "Club Kaiju",
    description:
      "Un grupo de estudiantes administra un club escolar secreto dedicado a documentar criaturas gigantes pacificas.",
    author: "MaxDy Studio",
    status: "FINISHED",
    score: 8.4,
    ranking: 3,
    popularity: 6100,
    coverUrl: "https://picsum.photos/seed/kaiju-cover/600/900",
    bannerUrl: "https://picsum.photos/seed/kaiju-banner/1400/600",
    genreSlugs: ["slice-of-life", "drama"],
  },
];

async function main() {
  const passwordHash = await hashPassword("MaxDyDemo123");

  const admin = await prisma.user.upsert({
    where: { email: "admin@maxdy.local" },
    update: {},
    create: {
      username: "maxdy_admin",
      email: "admin@maxdy.local",
      passwordHash,
      role: "ADMIN",
      emailVerifiedAt: new Date(),
    },
  });

  for (const [name, slug] of genres) {
    await prisma.genre.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    });
  }

  for (const mangaData of mangas) {
    const { genreSlugs, ...data } = mangaData;
    const manga = await prisma.manga.upsert({
      where: { slug: data.slug },
      update: data,
      create: data,
    });

    const linkedGenres = await prisma.genre.findMany({
      where: { slug: { in: genreSlugs } },
    });

    await prisma.mangaGenre.deleteMany({ where: { mangaId: manga.id } });
    await prisma.mangaGenre.createMany({
      data: linkedGenres.map((genre) => ({ mangaId: manga.id, genreId: genre.id })),
      skipDuplicates: true,
    });

    for (let chapterNumber = 1; chapterNumber <= 3; chapterNumber += 1) {
      const chapter = await prisma.chapter.upsert({
        where: { mangaId_number: { mangaId: manga.id, number: chapterNumber } },
        update: { isPublished: true },
        create: {
          mangaId: manga.id,
          number: chapterNumber,
          title: `Capitulo ${chapterNumber}`,
          slug: `capitulo-${chapterNumber}`,
          isPublished: true,
          publicationDate: new Date(),
        },
      });

      await prisma.chapterPage.deleteMany({ where: { chapterId: chapter.id } });
      await prisma.chapterPage.createMany({
        data: [1, 2, 3, 4].map((pageNumber) => ({
          chapterId: chapter.id,
          pageNumber,
          imageUrl: `https://picsum.photos/seed/${manga.slug}-${chapterNumber}-${pageNumber}/900/1300`,
          altText: `${manga.title} capitulo ${chapterNumber} pagina ${pageNumber}`,
        })),
      });
    }
  }

  await prisma.forumThread.upsert({
    where: { mangaId_slug: { mangaId: (await prisma.manga.findUnique({ where: { slug: "redline-district" } })).id, slug: "teorias-del-distrito" } },
    update: {},
    create: {
      mangaId: (await prisma.manga.findUnique({ where: { slug: "redline-district" } })).id,
      userId: admin.id,
      title: "Teorias del Distrito",
      slug: "teorias-del-distrito",
      isPinned: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
