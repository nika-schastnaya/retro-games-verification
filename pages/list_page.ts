import { Page } from "@playwright/test";
import { BasePage } from "@framework/pages/base_page";

export class ListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
