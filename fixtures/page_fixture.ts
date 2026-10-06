import { test as base } from "@playwright/test";
import { ListPage } from "@pages/list_page";

type Pages = {
  listPage: ListPage;
};

export const test = base.extend<Pages>({
  listPage: async ({ page }, use) => {
    await use(new ListPage(page));
  },
});
export { expect } from "@playwright/test";
