import BaseData from './_base';

class UserData extends BaseData {
  public getUser = async () => {
    const token = await this.confirmToken();
    if (!token) {
      throw new Error("Not logged in");
    }
    const user = await this.getJson("user");
    if (!user) {
      this.setToken(null);
      throw new Error(user.error || "Unknown error");
    }
    return {
      token,
      data: user,
    };
  }
  public loginUser = async (email: string, password: string) => {
    const token = await this.postJson("loginUser", { email, password });
    if (!token) {
      this.setToken(null);
      throw new Error("Unknown error");
    }
    this.setToken(token);
    const user = await this.getUser();
    if (!user) {
      this.setToken(null);
      throw new Error("Unknown error");
    }
    return user;
  }
  public registerUser = async (userData: any) => {
    const token = await this.postJson("registerUser", userData);
    if (!token) {
      this.setToken(null);
      throw new Error("Unknown error");
    }
    this.setToken(token);
    const user = await this.getUser();
    return user;
  }
  public logoutUser = async () => {
    await this.getJson("logoutUser");
    this.setToken(null);
    return {};
  }
  public updateUser = async (userData: any) => {
    const token = await this.confirmToken();
    if (!token) {
      throw new Error("Not logged in");
    }
    if (await this.postJson("updateUser", userData)) {
      return await this.getUser();
    } else {
      this.setToken(null);
      throw new Error("Unknown error");
    }
  }
  public changePassword = async (oldPassword: string, newPassword: string) => {
    const token = await this.confirmToken();
    if (!token) {
      throw new Error("Not logged in");
    }
    if (await this.postJson("updatePassword", {
      old_password: oldPassword,
      new_password: newPassword,
    })) {
      return await this.getUser();
    } else {
      this.setToken(null);
      throw new Error("Unknown error");
    }
  }
}

const userData = new UserData();

export default userData;