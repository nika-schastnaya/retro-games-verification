import { Config } from "@framework/configuration/configuration_helper";
import test, { request } from "@playwright/test";
import { GamesBuilderApi } from "@services/builders/games_builder";

test.describe("get /games api suite", () => {
  test("get game with page number and limit", async ({ request }) => {
    const pageNumberAndSize = 2;
    const response = await new GamesBuilderApi(request, Config.API_BASE_URL)
      .withLimit(pageNumberAndSize)
      .withPage(pageNumberAndSize)
      .getAllGames();

    console.log(response.response.url());
  });
});
