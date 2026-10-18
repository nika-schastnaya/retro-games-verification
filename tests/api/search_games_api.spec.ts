import { Config } from "@framework/configuration/configuration_helper";
import test, { expect, request } from "@playwright/test";
import { GamesBuilderApi } from "@services/builders/games_builder";

test.describe("get /games api suite", () => {
  test("get game with page number and limit", async ({ request }) => {
    const limit = 2;
    const page = 2;
    const response = await new GamesBuilderApi(request, Config.API_BASE_URL)
      .withLimit(limit)
      .withPage(page)
      .sendGetGames();

    const { games, pagination } = response.body;
    expect(Array.isArray(games)).toBeTruthy();
    expect(games.length).toBeLessThanOrEqual(limit);
    expect(games.length).toBeGreaterThan(0);
    for (const game of games) {
      expect(game).toMatchObject({
        _id: expect.any(String),
        name: expect.any(String),
        genre: expect.any(String),
        platforms: expect.any(Array),
        releaseDate: expect.any(String),
        hasMultiplayer: expect.any(Boolean),
        description: expect.any(String),
        imageUrl: expect.any(String),
        rating: expect.any(Number),
      });
    }
    expect(pagination).toMatchObject({
      currentPage: page,
      totalPages: expect.any(Number),
      totalGames: expect.any(Number),
      hasNextPage: expect.any(Boolean),
      hasPrevPage: expect.any(Boolean),
    });
  });

  test("get game by name", async ({ request }) => {
    const name = "Space";
    const page = 1;
    const limit = 12;
    const response = await new GamesBuilderApi(request, Config.API_BASE_URL)
      .withLimit(limit)
      .withPage(page)
      .withSearch(name)
      .sendGetGames();

    const { games } = response.body;
    expect(games.length).toBe(1);
    for (const game of games) {
      expect(game).toMatchObject({
        _id: expect.any(String),
        name: "Space Invaders",
        genre: expect.any(String),
        platforms: expect.any(Array),
        releaseDate: expect.any(String),
        hasMultiplayer: expect.any(Boolean),
        description: expect.any(String),
        imageUrl: expect.any(String),
        rating: expect.any(Number),
      });
    }
  });
});
