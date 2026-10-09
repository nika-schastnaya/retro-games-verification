import { BasePage } from "@framework/pages/base_page";
import { Locator, Page } from "@playwright/test";
import { ListPage } from "@pages/list_page";

export class EntityPage extends BasePage {
  readonly backToHome: Locator;
  readonly gameImage: Locator;
  readonly gameName: Locator;
  readonly gameGenre: Locator;
  readonly gameReleaseDate: Locator;
  readonly gameMultiplayer: Locator;
  readonly gameRating: Locator;
  readonly gamePlatform: Locator;

  constructor(page: Page) {
    super(page);
    this.backToHome = page.getByTestId("back-to-home");
    this.gameImage = page.getByTestId("game-image");
    this.gameName = page.getByTestId("game-name");
    this.gameGenre = page.getByTestId("game-genre");
    this.gameReleaseDate = page.getByTestId("game-release-date");
    this.gameMultiplayer = page.getByTestId("game-multiplayer");
    this.gameRating = page.getByTestId("game-rating");
    this.gamePlatform = page.getByTestId("game-platforms");
  }

  async clickBackToHome(): Promise<ListPage> {
    await this.backToHome.click();

    return new ListPage(this.page);
  }
}
