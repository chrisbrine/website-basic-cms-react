import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import {
  fetchDeleteBlogPost,
  getMyBlogPostsLoading,
  getMyBlogPosts,
} from "../../../store";
import Loading from "../../loading";
import { Link } from "react-router-dom";
import '../resumes.css';
import { convertDateToStringFull } from "../../../utils/date";

export default function BlogPosts() {
  const dispatch = useDispatch();
  // const mainData = useSelector(getMainData);
  // const user = useSelector(getUserData, shallowEqual);
  const blogPosts = useSelector(getMyBlogPosts, shallowEqual);
  const blogPostsIsLoading = useSelector(getMyBlogPostsLoading, shallowEqual);
  const hasBlogPosts: boolean = blogPosts?.length > 0;

  const onDelete = (blogPost: any) => {
    const blogPostId = blogPost.id;
    if (blogPostId) {
      dispatch(fetchDeleteBlogPost(blogPostId) as unknown as AnyAction);
    }
  }

  return blogPostsIsLoading ? (
    <Loading />
  ) : (
    <div className='blog-posts'>
      <table className='item-list blog-posts'>
        <thead>
          <tr>
            <th>#</th>
            <th>Slug</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Date</th>
            <th className='actions'>Action</th>
          </tr>
        </thead>
        <tbody>
          {hasBlogPosts && blogPosts.map((blogPost: any, index: number) => (
            <tr key={index}>
              <td>
                <Link to={`/dashboard/blog/${blogPost.id}`}>
                  {blogPost.id}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/blog/${blogPost.id}`}>
                  {blogPost.slug}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/blog/${blogPost.id}`}>
                  {blogPost.title}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/blog/${blogPost.id}`}>
                  {blogPost.category}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/blog/${blogPost.id}`}>
                  {blogPost.status}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/blog/${blogPost.id}`}>
                  {convertDateToStringFull(blogPost.created_at)}
                </Link>
              </td>
              <td className='actions'>
                <Link to={`/dashboard/blog/${blogPost.id}`} className='edit-button'>
                  Edit
                </Link>
                <Link to={'/dashboard/blog'} onClick={() => onDelete(blogPost)} className='delete-button'>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!hasBlogPosts && (
        <div className='empty-list'>
          <h4>Nothing to list</h4>
        </div>
      )}
      <Link to={'/dashboard/blog/new'} className='create-new'>Create Blog Post</Link>
    </div>
  );
}