import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as AuthorService from "./service";

export const router = express.Router();

// listing
router.get("/", async (req: Request, res: Response) => {
  try {
    const authors = await AuthorService.list();
    return res.status(200).json(authors);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

// read
router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const author = await AuthorService.read(id);

    if (!author) {
      return res.status(404).json("Author could not be found");
    }

    return res.status(200).json(author);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
