import { db } from "../utils/db-server";

type Author = {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: Date;
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
