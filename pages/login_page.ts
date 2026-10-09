import { BasePage } from "@framework/pages/base_page";
import { Page } from "@playwright/test";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("/login");
  }

  async loginUI(email: string, password: string) {
    await this.page.getByTestId("email-input").fill(email);
    await this.page.getByTestId("password-input").fill(password);

    await this.page.getByTestId("login-button-button").click();
  }
}
