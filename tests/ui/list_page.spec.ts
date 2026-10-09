import { expect, test } from "@fixtures/page_fixture";

test.describe("game list page suite", () => {
  test("game grid is available on list page", async ({ listPage }) => {
    await listPage.goto();

    await expect(listPage.pageHeader).toBeVisible();
    await expect(listPage.gamesGrid).toBeVisible();
    await expect(listPage.gameCard.first()).toBeVisible();
  });

  test("game card is opened after clicking on it", async ({ listPage }) => {
    await listPage.goto();
    const entityPage = await listPage.clickFirstGameCard();

    await expect(entityPage.gameImage).toBeVisible();
    await expect(entityPage.gameName).toBeVisible();
    await expect(entityPage.gameGenre).toBeVisible();
    await expect(entityPage.gameRating).toBeVisible();
    await expect(entityPage.gameMultiplayer).toBeVisible();
    await expect(entityPage.gamePlatform).toBeVisible();
    await expect(entityPage.gameReleaseDate).toBeVisible();
  });
});
