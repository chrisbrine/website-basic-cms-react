import { useNavigate, useParams } from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchDeleteBlogPost, fetchUpdateBlogPost, getMyBlogPosts, getMyBlogPostsLoading, } from "../../../store";
import Education from "./item";
import Loading from "../../loading";

export default function EditBlogPost() {
  const id = parseInt(useParams<{id: string}>()?.id ?? '');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogPosts = useSelector(getMyBlogPosts, shallowEqual);
  const currentBlogPost = blogPosts.find((blogPost: any) => blogPost.id === id);
  const blogPostsIsLoading = useSelector(getMyBlogPostsLoading, shallowEqual);

  if (blogPostsIsLoading) {
    return (
      <Loading />
    );
  }


  const onSave = (blogPost: any) => {
    const blogPostId = blogPost.id;
    if (blogPostId) {
      dispatch(fetchUpdateBlogPost({
        id: blogPostId,
        blog: blogPost,
      }) as unknown as AnyAction);
    }
    navigate('/dashboard/blog');
  }

  const onDelete = (blogPost: any) => {
    const blogPostId = blogPost.id;
    if (blogPostId) {
      dispatch(fetchDeleteBlogPost(blogPostId) as unknown as AnyAction);
    }
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
      <h1 className='title'>Edit Blog Post</h1>
      <Link to='/dashboard/blog' className='back'>Back to Blog Posts</Link>
      <Education
        blogPost={currentBlogPost}
        onSave={onSave}
        onDelete={onDelete}
        checkSlug={checkSlug}
      />
    </>
  );
}
