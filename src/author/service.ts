import { db } from "../utils/db-server";

type Author = {
  id: number;
  firstName: string;
  lastName: string;
  createdAt?: Date;
};

export const list = async (): Promise<Author[]> => {
  return db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
  });
};

export const read = async (id: number): Promise<Author | null> => {
  return db.author.findUnique({
    where: {
      id,
    },
  });
};

export const create = async (author: Omit<Author, "id">): Promise<Author> => {
  const { firstName, lastName } = author;
  return db.author.create({
    data: {
      firstName,
      lastName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

export const update = async (
  author: Omit<Author, "id">,
  id: number
): Promise<Author> => {
  const { firstName, lastName } = author;
  return db.author.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
    },
  });
};

export const destroy = async (id: number): Promise<void> => {
  await db.author.delete({
    where: {
      id,
    },
  });
};
