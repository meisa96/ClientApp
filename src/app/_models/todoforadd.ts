import { Photo } from "./photo";

export interface Todoforadd {
  id: number;
  description: string;
  date: Date;
  time: Date;
  isdone: boolean;
  photos: Photo[];
}
