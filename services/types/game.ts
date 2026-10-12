export type Game = {
  _id: string;
  name: string;
  genre: string;
  platforms: string[];
  releaseDate: string;
  hasMultiplayer: boolean;
  description: string;
  imageUrl: string;
  rating: number;
  createdBy: string | null;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalGames: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type SearchGames = {
  games: Game[];
  pagination: Pagination;
};
