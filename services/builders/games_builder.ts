import { BaseApiBuilder } from "@framework/api/base_api_builder";
import { APIRequestContext } from "@playwright/test";
import { ApiUrls } from "@services/constants/api_urls";
import { ApiResult, toApiResult } from "@services/types/api_results";
import { Game, SearchGames } from "@services/types/game";
import { URL } from "url";

export type GetGameApiResult = ApiResult<Game>;

export class GamesBuilderApi extends BaseApiBuilder {
  private headers: Record<string, string> = {};
  searchUrl: URL;
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
    this.searchUrl = new URL(`${baseUrl}${ApiUrls.games}`);
  }

  withPage(page: number) {
    this.searchUrl.searchParams.set("page", page.toString());
    return this;
  }

  withLimit(limit: number) {
    this.searchUrl.searchParams.set("limit", limit.toString());
    return this;
  }
  //search=&genre=&yearFrom=&yearTo=&multiplayer=

  async getAllGames() {
    const response = await this.request.get(`${this.searchUrl}`, {
      headers: this.headers,
    });
    return toApiResult<SearchGames>(response);
  }

  async sendGetGameById(id: string): Promise<GetGameApiResult> {
    const response = await this.request.get(
      `${this.baseUrl}${ApiUrls.gamesById(id)}`,
      {
        headers: this.headers,
      },
    );

    return toApiResult<Game>(response);
  }
}
