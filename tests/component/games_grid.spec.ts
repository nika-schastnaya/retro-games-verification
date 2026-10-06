import { test } from "@playwright/test";

test.describe("games grid component tests suite", () => {
  test("games api aborted should display no games found", async ({ page }) => {
    await page.route(
      "http://localhost:9000/api/games?page=1&limit=12&search=&genre=&yearFrom=&yearTo=&multiplayer=",
      (route) => route.abort(),
    );
    await page.goto("localhost:9000");
    await page.getByLabel("No games found").isVisible();
  });

  test("negative games property system should handle", async ({ page }) => {
    const gameWithNegativeProperties = {
      games: [
        {
          _id: "this-is-not-a-valid-mongodb-object-id-and-it-is-intentionally-extremely-long-1234567890",
          name: "This Is An Extremely Long Game Title Created Specifically For Negative Testing To Verify How The Application Handles Titles That Are Far Longer Than Expected And Whether The UI Correctly Wraps Truncates Or Otherwise Handles Such An Unreasonably Long Game Name Without Breaking The Layout",
          genre:
            "Action/RPG/Fighting/Shooter/Puzzle/Adventure/<script>alert('test')</script>!@#$%^&*()_+",
          platforms: [
            "",
            "NES",
            "NES",
            "An Extremely Long Platform Name That Should Probably Never Exist In A Real Application But Is Useful For Testing Overflow And Validation",
            "!@#$%^&*()",
          ],
          releaseDate: "9999-12-31T23:59:59.999Z",
          hasMultiplayer: false,
          description:
            "This is an intentionally extremely long description used for negative testing. It contains special characters !@#$%^&*()_+-={}[]|\\:;\"'<>,.?/~`, Unicode characters: Привет 世界 🎮👾🔥, HTML-like content <b>bold</b>, script-like content <script>alert('test')</script>, repeated text repeated text repeated text repeated text repeated text repeated text repeated text repeated text repeated text repeated text.",
          imageUrl:
            'this-is-definitely-not-a-valid-url://<>"{}|\\^`[] and contains spaces 🎮',
          rating: -999999.99,
          createdBy:
            "this-is-an-intentionally-invalid-and-extremely-long-user-identifier-that-should-not-normally-be-returned-by-the-api-1234567890",
        },
      ],
      pagination: {
        currentPage: -1,
        totalPages: -999,
        totalGames: -1,
        hasNextPage: false,
        hasPrevPage: true,
      },
    };
    await page.route(
      "http://localhost:9000/api/games?page=1&limit=12&search=&genre=&yearFrom=&yearTo=&multiplayer=",
      (route) => {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(gameWithNegativeProperties),
        });
      },
    );
    await page.goto("localhost:9000");
    await page.waitForTimeout(20000);
  });
});
