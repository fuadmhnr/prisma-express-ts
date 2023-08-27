import express from "express";
import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as AuthorService from "./service";
import { authorRequest } from "./requests/author-request";

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

// create
router.post("/", authorRequest, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const author = req.body;
    const data = await AuthorService.create(author);
    return res.status(201).json(data);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

// update
router.put("/:id", authorRequest, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const data = req.body;

    // check the existing author by ID
    const author = await AuthorService.read(id);

    if (!author) {
      return res.status(404).json("Author could not be found");
    }

    const attr = await AuthorService.update(data, id);
    return res.status(200).json(attr);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

// delete
router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  try {
    // check the existing author by ID
    const author = await AuthorService.read(id);

    if (!author) {
      return res.status(404).json("Author could not be found");
    }

    await AuthorService.destroy(id);
    return res.status(204).json("Author has been successfully deleted");
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
