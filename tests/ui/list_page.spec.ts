import { expect, test } from "@fixtures/page_fixture";

test.describe("game list page suite", () => {
  test("game grid is available on list page", async ({ listPage }) => {
    await listPage.goto();

    await expect.soft(listPage.pageHeader).toBeVisible();
    await expect.soft(listPage.gamesGrid).toBeVisible();
    await expect.soft(listPage.gameCard.first()).toBeVisible();
  });

  test("game card is opened after clicking on it", async ({ listPage }) => {
    await listPage.goto();
    const entityPage = await listPage.clickFirstGameCard();

    await expect.soft(entityPage.gameImage).toBeVisible();
    await expect.soft(entityPage.gameName).toBeVisible();
    await expect.soft(entityPage.gameGenre).toBeVisible();
    await expect.soft(entityPage.gameRating).toBeVisible();
    await expect.soft(entityPage.gameMultiplayer).toBeVisible();
    await expect.soft(entityPage.gamePlatform).toBeVisible();
    await expect.soft(entityPage.gameReleaseDate).toBeVisible();
  });
});
