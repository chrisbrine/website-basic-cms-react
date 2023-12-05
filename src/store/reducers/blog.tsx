import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogData } from "../../data";

export const fetchMyBlogPosts = createAsyncThunk(
  'blog/fetchMyBlogPosts',
  async () => {
    return await BlogData.getUserBlogPosts();
  },
);

export const fetchBlogPosts = createAsyncThunk(
  'blog/fetchBlogPosts',
  async () => {
    return await BlogData.getPublicBlogPosts();
  },
);

export const fetchBlogPost = createAsyncThunk(
  'blog/fetchBlogPost',
  async (id: number) => {
    return await BlogData.getBlogPost(id);
  },
);

export const fetchCreateBlogPost = createAsyncThunk(
  'blog/fetchCreateBlogPost',
  async (blog: any) => {
    return await BlogData.createBlogPost(blog);
  },
);

export const fetchUpdateBlogPost = createAsyncThunk(
  'blog/fetchUpdateBlogPost',
  async ({id, blog}: {id: number, blog: any}) => {
    return await BlogData.updateBlogPost(id, blog);
  },
);

export const fetchDeleteBlogPost = createAsyncThunk(
  'blog/fetchDeleteBlogPost',
  async (id: number) => {
    return await BlogData.deleteBlogPost(id);
  },
);

const initialState: {
  data: any,
  myPosts: any,
  blogPost: any,
  loadingMyBlogPosts: boolean,
  loadingBlogPosts: boolean,
  loadingBlogPost: boolean,
  loadingCreate: boolean,
  loadingUpdate: boolean,
  loadingDelete: boolean,
  loadingError: boolean,
  createError: boolean,
  updateError: boolean,
  deleteError: boolean,
} = {
  data: [],
  myPosts: [],
  blogPost: null,
  loadingMyBlogPosts: true,
  loadingBlogPosts: true,
  loadingBlogPost: true,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  loadingError: false,
  createError: false,
  updateError: false,
  deleteError: false,
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    blogReset: (state) => {
      state.data = [];
      state.myPosts = [];
      state.blogPost = null;
      state.loadingMyBlogPosts = false;
      state.loadingBlogPosts = false;
      state.loadingBlogPost = false;
      state.loadingCreate = false;
      state.loadingUpdate = false;
      state.loadingDelete = false;
      state.loadingError = false;
      state.createError = false;
      state.updateError = false;
      state.deleteError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyBlogPosts.pending, (state) => {
      state.loadingMyBlogPosts = true;
      state.loadingError = false;
    })
    .addCase(fetchMyBlogPosts.fulfilled, (state, action) => {
      state.loadingMyBlogPosts = false;
      state.myPosts = action.payload;
    })
    .addCase(fetchMyBlogPosts.rejected, (state) => {
      state.myPosts = [];
      state.loadingMyBlogPosts = false;
      state.loadingError = true;
    })
    .addCase(fetchBlogPosts.pending, (state) => {
      state.loadingBlogPosts = true;
      state.loadingError = false;
    })
    .addCase(fetchBlogPosts.fulfilled, (state, action) => {
      state.loadingBlogPosts = false;
      state.data = action.payload;
    })
    .addCase(fetchBlogPosts.rejected, (state, action) => {
      state.loadingBlogPosts = false;
      state.loadingError = true;
      state.data = null;
    })
    .addCase(fetchBlogPost.pending, (state) => {
      state.loadingBlogPost = true;
      state.loadingError = false;
    })
    .addCase(fetchBlogPost.fulfilled, (state, action) => {
      state.loadingBlogPost = false;
      state.blogPost = action.payload;
    })
    .addCase(fetchBlogPost.rejected, (state, action) => {
      state.loadingBlogPost = false;
      state.loadingError = true;
      state.blogPost = null;
    })
    .addCase(fetchCreateBlogPost.pending, (state) => {
      state.loadingCreate = true;
      state.createError = false;
    })
    .addCase(fetchCreateBlogPost.fulfilled, (state, action) => {
      state.loadingCreate = false;
      state.myPosts = [...state.myPosts, action.payload];
    })
    .addCase(fetchCreateBlogPost.rejected, (state, action) => {
      state.loadingCreate = false;
      state.createError = true;
    })
    .addCase(fetchUpdateBlogPost.pending, (state) => {
      state.loadingUpdate = true;
      state.updateError = false;
    })
    .addCase(fetchUpdateBlogPost.fulfilled, (state, action) => {
      state.loadingUpdate = false;
      state.myPosts = state.myPosts.map((blogPost: any) => {
        if (blogPost.id === action.payload.id) {
          return action.payload;
        }
        return blogPost;
      });
    })
    .addCase(fetchUpdateBlogPost.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.updateError = true;
    })
    .addCase(fetchDeleteBlogPost.pending, (state) => {
      state.loadingDelete = true;
      state.deleteError = false;
    })
    .addCase(fetchDeleteBlogPost.fulfilled, (state, action) => {
      state.loadingDelete = false;
      state.myPosts = state.myPosts.filter((blogPost: any) => {
        return blogPost.id !== action.payload;
      });
    })
    .addCase(fetchDeleteBlogPost.rejected, (state, action) => {
      state.loadingDelete = false;
      state.deleteError = true;
    });
  }
});

export const { blogReset } = blogSlice.actions;

export default blogSlice.reducer;

export const getPublicBlogPosts = (state: any) => state.blog?.data;
export const getMyBlogPosts = (state: any) => state.blog?.myPosts;
export const getBlogPost = (state: any) => state.blog?.blogPost;
export const getMyBlogPostsLoading = (state: any) => state.blog?.loadingMyBlogPosts;
export const getBlogPostsLoading = (state: any) => state.blog?.loadingBlogPosts;
export const getBlogPostLoading = (state: any) => state.blog?.loadingBlogPost;
export const getBlogPostsError = (state: any) => state.blog?.loadingError;
export const getCreateBlogPostLoading = (state: any) => state.blog?.loadingCreate;
export const getCreateBlogPostError = (state: any) => state.blog?.createError;
export const getUpdateBlogPostLoading = (state: any) => state.blog?.loadingUpdate;
export const getUpdateBlogPostError = (state: any) => state.blog?.updateError;
export const getDeleteBlogPostLoading = (state: any) => state.blog?.loadingDelete;
export const getDeleteBlogPostError = (state: any) => state.blog?.deleteError;
