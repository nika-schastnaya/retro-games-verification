import { Locator, Page } from "@playwright/test";
import { BasePage } from "@framework/pages/base_page";
import { EntityPage } from "@pages/entitiy_page";
import { LoginPage } from "@pages/login_page";
import { RegisterPage } from "@pages/register_page";

export class ListPage extends BasePage {
  readonly gamesGrid: Locator;
  readonly gameCard: Locator;
  readonly loginButton: Locator;
  readonly registerButton: Locator;
  readonly pageHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.gamesGrid = page.getByTestId("games-grid");
    this.gameCard = page.getByTestId("game-card");
    this.loginButton = page.getByRole("link", { name: "Login" });
    this.registerButton = page.getByRole("link", { name: "Register Owner" });
    this.pageHeader = page.getByRole("heading", {
      name: "🎮 RETRO GAMES PORTAL 🎮",
    });
  }

  async goto() {
    await this.page.goto("");
  }

  async clickFirstGameCard(): Promise<EntityPage> {
    await this.gameCard.first().click();

    return new EntityPage(this.page);
  }

  async clickLogin(): Promise<LoginPage> {
    await this.loginButton.click();

    return new LoginPage(this.page);
  }

  async clickRegister(): Promise<RegisterPage> {
    await this.registerButton.click();

    return new RegisterPage(this.page);
  }
}
