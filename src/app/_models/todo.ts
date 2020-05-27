import { Photo } from './photo';

export interface Todo {
  id: number;
  description: string;
  dateTime: Date;
  isDone: boolean;
  photoUrl: string;
  images?: Photo[];
}
