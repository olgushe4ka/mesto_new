import { Request } from "express";

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

export interface ICard {
  name: string;
  link: string;
  owner: unknown;
  likes: unknown;
  createdAt: Date;
}

export interface RequestCustom extends Request {
  user?: {
    _id: string;
  };
}
