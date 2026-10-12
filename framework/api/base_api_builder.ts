import { APIRequestContext } from "@playwright/test";
import { URL } from "url";

export abstract class BaseApiBuilder {
  constructor(
    protected readonly request: APIRequestContext,
    protected baseUrl: string,
  ) {}
}
