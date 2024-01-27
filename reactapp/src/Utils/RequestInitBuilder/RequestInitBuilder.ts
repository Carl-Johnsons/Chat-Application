type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export default class RequestInitBuilder implements RequestInit {
  private requestInit: RequestInit;

  constructor() {
    this.requestInit = {};
  }
  withMethod(method: RequestMethod) {
    this.requestInit.method = method;
    return this;
  }
  withContentJson() {
    this.requestInit.headers = {
      ...this.requestInit.headers,
      "Content-Type": "application/json",
    };
    return this;
  }
  withAuthorization(token: string | null) {
    this.requestInit.headers = {
      ...this.requestInit.headers,
      Authorization: token ?? "",
    };
    return this;
  }
  withBody(data: BodyInit) {
    this.requestInit.body = data;
    return this;
  }
  build() {
    return this.requestInit;
  }

  // Implementing properties required by RequestInit
  get method(): string | undefined {
    return this.requestInit.method;
  }

  set method(value: string | undefined) {
    this.requestInit.method = value;
  }

  get headers(): HeadersInit | undefined {
    return this.requestInit.headers;
  }

  set headers(value: HeadersInit | undefined) {
    this.requestInit.headers = value;
  }
}
