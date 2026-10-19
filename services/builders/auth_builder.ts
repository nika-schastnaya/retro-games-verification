import { BaseApiBuilder } from "@framework/api/base_api_builder";
import { APIRequestContext } from "@playwright/test";
import { ApiUrls } from "@services/constants/api_urls";
import { ApiResult, toApiResult } from "@services/types/api_results";
import {
  AuthResponse,
  MeResponse,
  MessageResponse,
  OwnerExistsResponse,
  RegisterRequest,
} from "@services/types/auth";

export type LoginApiResult = ApiResult<AuthResponse>;
export type RegisterApiResult = ApiResult<AuthResponse>;
export type GetMeApiResult = ApiResult<MeResponse>;
export type LogoutApiResult = ApiResult<MessageResponse>;
export type GetOwnerExistsApiResult = ApiResult<OwnerExistsResponse>;

export class AuthApiBuilder extends BaseApiBuilder {
  private rawBody: unknown;
  private body: Partial<RegisterRequest> = {};
  private headers: Record<string, string> = {};
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  withEmail(email: string) {
    this.body.email = email;
    return this;
  }

  withPassword(password: string) {
    this.body.password = password;
    return this;
  }

  withConfirmPassword(password: string) {
    this.body.confirmPassword = password;
    return this;
  }

  withBearer(token: string) {
    this.headers.Authorization = `Bearer ${token}`;
    return this;
  }

  async sendLogin(): Promise<LoginApiResult> {
    const response = await this.request.post(
      `${this.baseUrl}${ApiUrls.login}`,
      {
        headers: this.headers,
        data: this.rawBody !== undefined ? this.rawBody : this.body,
      },
    );
    return toApiResult<AuthResponse>(response);
  }

  async sendRegister(): Promise<RegisterApiResult> {
    const response = await this.request.post(
      `${this.baseUrl}${ApiUrls.register}`,
      {
        headers: this.headers,
        data: this.rawBody !== undefined ? this.rawBody : this.body,
      },
    );
    return toApiResult<AuthResponse>(response);
  }

  async sendGetMe(): Promise<GetMeApiResult> {
    const response = await this.request.get(`${this.baseUrl}${ApiUrls.me}`, {
      headers: this.headers,
    });
    return toApiResult<MeResponse>(response);
  }

  async sendLogout(): Promise<LogoutApiResult> {
    const response = await this.request.post(
      `${this.baseUrl}${ApiUrls.logout}`,
      {
        headers: this.headers,
      },
    );
    return toApiResult<MessageResponse>(response);
  }

  async sendGetOwnerExists(): Promise<GetOwnerExistsApiResult> {
    const response = await this.request.get(
      `${this.baseUrl}${ApiUrls.ownerExists}`,
      {
        headers: this.headers,
      },
    );
    return toApiResult<OwnerExistsResponse>(response);
  }
}
