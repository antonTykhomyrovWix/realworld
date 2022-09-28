import { Author } from "./author";

export type Comment = Readonly<{
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: Author;
}>;
