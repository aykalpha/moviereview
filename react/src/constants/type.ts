export type Genre = {
  id: number;
  name: string;
}

export type Movie = {
  id: number;
  title: string;
  release_year: number;
  description: string;
  image_path: string;
  genre?: Genre;
  reviews_count?: number;
  reviews_avg_evaluation?: number;
}

export type  User = {
  id: number;
  name: string;
}

export type Review = {
  id: number;
  user: User;
  evaluation: number;
  comment: string;
}