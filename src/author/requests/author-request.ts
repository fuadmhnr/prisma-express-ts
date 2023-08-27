import { check } from "express-validator";

export const authorRequest = [
  check("firstName").isString(),
  check("lastName").isString(),
];
