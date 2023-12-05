class BaseData {
  public getHost = () =>
  `http://${window.location.hostname}:8000/data/`;

  public handleHeaders = async (method: string, body?: any): Promise<RequestInit> => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Accept': 'application/json',
    };
    const token = await this.confirmToken();

    if (token) {
      (headers as any)['x-access-token'] = `${token}`;
    }

    return body ? {
      method,
      headers,
      body: JSON.stringify(body),
    } : {
      method,
      headers,
    };
  }

  public handle = async (method: string, path: string, body?: any) => {
    const url = `${this.getHost()}${path}`
    let headers: RequestInit;
    switch (method) {
      case "GET":
        headers = await this.handleHeaders("GET");
        break;
      case "POST":
        headers = await this.handleHeaders("POST", body);
        break;
      case "DELETE":
        headers = await this.handleHeaders("DELETE");
        break;
      default:
        throw new Error("Invalid method");
    }
    const response = await fetch(
      url,
      headers,
    );
    return response;
  }

  public handleJson = async (method: string, path: string, body?: any) => {
    let response: any;
    switch (method) {
      case "GET":
        response = await this.handle("GET", path);
        break;
      case "POST":
        response = await this.handle("POST", path, body);
        break;
      case "DELETE":
        response = await this.handle("DELETE", path);
        break;
      default:
        throw new Error("Invalid method");
    }
    const data = await response.json();

    if (data.success) {
      return data.data ?? [];
    }

    throw new Error(data.error ?? "Unknown error");
  }

  public getJson = async (path: string) =>
    await this.handleJson("GET", path);

  public postJson = async (path: string, body: any) =>
    await this.handleJson("POST", path, body);

  public deleteJson = async (path: string) =>
    await this.handleJson("DELETE", path);

  public confirmToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }
    this.setToken(token);

    return token;
  }
  public setToken = (token: string | null) => {
    if (!token) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", token);
    }
  }
}

export default BaseData;
