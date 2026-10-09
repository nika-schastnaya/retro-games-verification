import { test as base } from "@playwright/test";
import { ListPage } from "@pages/list_page";
import { EntityPage } from "@pages/entitiy_page";

type Pages = {
  listPage: ListPage;
  entityPage: EntityPage;
};

export const test = base.extend<Pages>({
  listPage: async ({ page }, use) => {
    await use(new ListPage(page));
  },
  entityPage: async ({ page }, use) => {
    await use(new EntityPage(page));
  },
});
export { expect } from "@playwright/test";
