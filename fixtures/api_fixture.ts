import { test as base, APIRequestContext } from "@playwright/test";
import { Config } from "@framework/configuration/configuration_helper";
import { AuthApiBuilder } from "@services/builders/auth_builder";

type ApiWorkerFixtures = {
  authToken: string;
  authedRequest: APIRequestContext;
};

export const test = base.extend<{}, ApiWorkerFixtures>({
  authToken: [
    async ({ playwright }, use) => {
      const request = await playwright.request.newContext();
      const login = await new AuthApiBuilder(request, Config.API_BASE_URL)
        .withEmail(Config.ADMIN_EMAIL)
        .withPassword(Config.ADMIN_PASSWORD)
        .sendLogin();
      await request.dispose();
      if (login.status !== 200) {
        throw new Error(
          `Login failed: ${login.status} ${JSON.stringify(login.body)}`,
        );
      }
      await use(login.body.token);
    },
    { scope: "worker" },
  ],

  authedRequest: [
    async ({ playwright, authToken }, use) => {
      const ctx = await playwright.request.newContext({
        extraHTTPHeaders: { Authorization: `Bearer ${authToken}` },
      });
      await use(ctx);
      await ctx.dispose();
    },
    { scope: "worker" },
  ],
});

export { expect } from "@playwright/test";
