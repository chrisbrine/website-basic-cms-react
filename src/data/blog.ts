import BaseData from "./_base";

class BlogData extends BaseData {
  public getUserBlogPosts = async () => {
    const data = await this.getJson("blog/mine");
    if (data) {
      return data;
    } else if (data.error) {
      throw new Error(data.error);
    } else {
      throw new Error("Unknown error");
    }
  }
  public getBlogPost = async (id: number) => {
    const data = await this.getJson(`blog/${id}`);
    if (data) {
      return data;
    } else if (data.error) {
      throw new Error(data.error);
    } else {
      throw new Error("Unknown error");
    }
  }
  public getPublicBlogPosts = async () => {
    const data = await this.getJson("blog");
    if (data) {
      return data;
    } else if (data.error) {
      throw new Error(data.error);
    } else {
      throw new Error("Unknown error");
    }
  }
  public createBlogPost = async (blog: any) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.postJson("blog", blog);
    return data;
  }
  public updateBlogPost = async (id: number, blog: any) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    const data = await this.postJson(`blog/${id}`, blog);
    return data;
  }
  public deleteBlogPost = async (id: number) => {
    if (!this.confirmToken()) {
      throw new Error("Not logged in");
    }
    await this.deleteJson(`blog/${id}`);
    return id;
  }
}

const blogData = new BlogData();

export default blogData;
