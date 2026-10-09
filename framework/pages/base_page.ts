import { Page } from "@playwright/test";
import { Config } from "@framework/configuration/configuration_helper";

export class BasePage {
  private BASE_URL = Config.BASE_URL;
  constructor(protected page: Page) {}
}
