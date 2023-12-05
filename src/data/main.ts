import BaseData from "./_base";

class MainData extends BaseData {
  public getMain = async () => {
    const data = await this.getJson("getAllPublic");
    if (data) {
      return data;
    } else if (data.error) {
      throw new Error(data.error);
    } else {
      throw new Error("Unknown error");
    }
  }
  public getSettings = async () => {
    const data = await this.getJson("settings");
    if (data) {
      return data;
    } else if (data.error) {
      throw new Error(data.error);
    } else {
      throw new Error("Unknown error");
    }
  }
  public addSetting = async (setting: any) => {
    const data = await this.postJson("settings", setting);
    if (data) {
      return data;
    } else if (data.error) {
      throw new Error(data.error);
    } else {
      throw new Error("Unknown error");
    }
  }
  public updateSetting = async (id: number, setting: any) => {
    const data = await this.postJson(`settings/${id}`, setting);
    if (data) {
      return data;
    } else if (data.error) {
      throw new Error(data.error);
    } else {
      throw new Error("Unknown error");
    }
  }
}

const mainData = new MainData();

export default mainData;
