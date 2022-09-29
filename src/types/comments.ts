import { Profile } from "./profile";

export type Comment = Readonly<{
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}>;
