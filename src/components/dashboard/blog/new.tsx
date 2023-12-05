import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchCreateBlogPost, getMyBlogPosts, getMyBlogPostsLoading, getUserData } from "../../../store";
import EditBlogPost from "./item";
import Loading from "../../loading";
import { BlogPostDefault } from "../../../types";

export default function CreateBlogPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUserData, shallowEqual);
  const blogPosts = useSelector(getMyBlogPosts, shallowEqual);
  const defaultBlogPost = {
    ...BlogPostDefault,
    user_id: user?.id,
  };

  const [
    newBlogPost,
    // setBlogPost,
  ] = useState(defaultBlogPost);

  const blogPostsIsLoading = useSelector(getMyBlogPostsLoading, shallowEqual);

  if (blogPostsIsLoading) {
    return (
      <Loading />
    );
  }


  const onCreate = (blog: any) => {
    dispatch(fetchCreateBlogPost(blog) as unknown as AnyAction);
    navigate('/dashboard/blog');
  }

  const checkSlug = (slug: string, id: number) => {
    if (blogPosts && blogPosts.length > 0) {
      const exists = blogPosts.some((blogPost: any) => blogPost.slug === slug && blogPost.id !== id);
      return !exists;
    }
    return true;
  }

  return (
    <>
      <h1 className='title'>Create Blog Post</h1>
      <Link to='/dashboard/blog' className='back'>Back to Blog Posts</Link>
      <EditBlogPost
        blogPost={newBlogPost}
        onSave={onCreate}
        checkSlug={checkSlug}
        title="Create Blog Post"
      />
    </>
  );
}
