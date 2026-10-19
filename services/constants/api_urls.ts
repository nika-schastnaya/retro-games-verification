export const ApiUrls = {
  gamesById: (id: string) => `/games/${id}`,
  games: "/games",

  login: "/auth/login",
  register: "/auth/register",
  me: "/auth/me",
  logout: "/auth/logout",
  ownerExists: "/auth/owner-exists",
};
