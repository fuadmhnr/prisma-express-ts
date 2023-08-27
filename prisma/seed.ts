import { db } from "../src/utils/db-server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );

  const author = await db.author.findFirst({
    where: {
      firstName: "Fuad",
    },
  });

  await Promise.all(
    getBooks().map((book) => {
      return db.book.create({
        data: {
          title: book.title,
          isFiction: book.isFiction,
          datePublished: book.datePublished,
          authorId: author.id,
        },
      });
    })
  );
}

seed();

function getAuthors(): Author[] {
  return [
    {
      firstName: "Fuad",
      lastName: "Muhammad Nur",
    },
    {
      firstName: "Alica",
      lastName: "Putri Azzahra",
    },
    {
      firstName: "Fajar",
      lastName: "Riyanto",
    },
    {
      firstName: "Diaz",
      lastName: "Fajar Rafa Iryanto",
    },
  ];
}

function getBooks(): Book[] {
  return [
    {
      title: "The Power of Habit",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "Assassin's Creed: Revelation",
      isFiction: true,
      datePublished: new Date(),
    },
    {
      title: "Marcus Aurelius: Meditation",
      isFiction: false,
      datePublished: new Date(),
    },
  ];
}
