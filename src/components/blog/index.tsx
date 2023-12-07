import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getMainData } from "../../store";
import './blog.scss';
import { processBlogDate } from "../../utils/date";
import { Link } from "react-router-dom";
import { Select } from "../forms";
import { useState } from "react";

export default function BlogPosts() {
  const paramSlug = useParams<{slug: string}>()?.slug;
  const navigate = useNavigate();
  const mainData = useSelector(getMainData);
  const blogPosts = mainData?.blog_posts || [];
  const [tag, setTag] = useState('');
  const [category, setCategory] = useState('');
  const [sortQuery, setSortQuery] = useState(0);
  const [slug, setSlug] = useState(paramSlug || '');
  const sortByDate = (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  const sortByTitle = (a: any, b: any) => a.title.localeCompare(b.title);
  const sortByReverseTitle = (a: any, b: any) => b.title.localeCompare(a.title);
  const sortByReverseDate = (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  
  window.onpopstate = () => {
    if (slug) {
      setSlug('');
      navigate('/blog');
    } else {
      navigate("/");
    }
  }

  const sortPosts = (posts: any[], sort: any) => {
    if (!sort) {
      return posts;
    }
    return posts.sort(sort);
  }
  
  const sortOptions: {
    position: number,
    title: string,
    func: ((a: any, b: any) => any) | null
  }[] = [
    {
      position: 0,
      title: 'Date (newest to oldest)',
      func: sortByDate,
    },
    {
      position: 1,
      title: 'Date (oldest to newest)',
      func: sortByReverseDate,
    },
    {
      position: 2,
      title: 'Title (A-Z)',
      func: sortByTitle,
    },
    {
      position: 3,
      title: 'Title (Z-A)',
      func: sortByReverseTitle,
    },
  ];

  const confirmSlug = (postSlug: string, postId: number, slug: string) => {
    if (slug && Number.isInteger(slug)) {
      if (postId === parseInt(slug)) {
        return true;
      }
    } else {
      return (postSlug === slug);
    }
  }

  const filterPosts = (posts: any, tag: any, category: any, slug: string, sort: any) => {
    const filteredPosts = posts.filter((post: any) => {
      const hasTag = tag ? post.tags.split(',').includes(tag) : true;
      const hasCategory = category ? post.category === category : true;
      const hasSlug = slug ? confirmSlug(post.slug, post.id, slug) : true;
  
      return hasTag && hasCategory && hasSlug;
    });
  
    return sortPosts(filteredPosts, sort || sortByDate);
  }
  
  const sortSelectOptions = Object.fromEntries(sortOptions.map((option: any, index: any) => [option.position, option.title]));
  const sort = sortQuery && sortOptions[sortQuery] ? sortOptions[sortQuery].func : null;
  const filteredBlogPosts = filterPosts(blogPosts, tag, category, slug || '', sort);
  const hasPosts = filteredBlogPosts.length > 0;
  const allTags = filteredBlogPosts.map((post: any) => post.tags.split(',')).flat();
  const allCategories = filteredBlogPosts.map((post: any) => post.category).flat();

  const gotoPost = (post: any) => {
    if (!slug) {
      setSlug(post.slug);
    }
  }

  const setFilter = (filter: any, option: any) => {
    if (!slug) {
      filter(option);
    }
  }

  const processBody = (body: string, postSlug: string) => {
    if (slug) {
      return body;
    }
    const removedHtml = body.replace(/<[^>]+>/g, '');
    const maxWords = 100;
    const words = removedHtml.split(' ');
    const hasMore = words.length > maxWords;
    const processed = words.slice(0, maxWords).join(' ');
    const processedBody = hasMore ? `${processed}...` : processed;
    const seeMore = (
      <div className='see-more' onClick={() => setSlug(postSlug)}>
        See More
      </div>
    );

    return (
      <>
        {processedBody}
        {hasMore && seeMore}
      </>
    );
  }

  return (
    <main className='blog frontend'>
      {/* <h1 className='main-title'>My Blog</h1> */}
        {!slug && (
        <div className='filter-options'>
          <div className='filter-clear-options'>
            {tag && (
              <div className='filter'>
                <div className='tag-filter text'>
                  <span className='filteriny-by'>Filtering by tag: </span>
                  <span className='tag value'>#{tag}</span>
                </div>
                <div className='remove-tag-filter remove' onClick={() => setFilter(setTag, '')}>
                  Clear Tag
                </div>
              </div>
            )}
            {category && (
              <div className='filter'>
                <div className='category-filter text'>
                  <span className='filteriny-by'>Filtering by category: </span>
                  <span className='category value'>#{category}</span>
                </div>
                <div className='remove-category-filter remove' onClick={() => setFilter(setCategory, '')}>
                  Clear Category
                </div>
              </div>
            )}
            {sortQuery > 0 && (
              <div className='filter'>
                <div className='sort-filter text'>
                  <span className='filteriny-by'>Sort by option: </span>
                  <span className='sort value'>#{sortQuery && sortOptions[sortQuery] ? sortOptions[sortQuery].title : 'None'}</span>
                </div>
                <div className='remove-category-filter remove' onClick={() => setFilter(setSortQuery, 0)}>
                  Clear Sort Query
                </div>
              </div>
            )}
          </div>
          <Select
            label='Sort By'
            name='sort-options'
            options={sortSelectOptions}
            value={sortQuery ? sortQuery : 0}
            onChange={(args: any) => {
              if (args?.value) {
                setSortQuery(args.value);
              } else {
                setSortQuery(0);
              }
            }}
          />
        </div> 
      )}
      {hasPosts ? (
        <ul className={`blogposts posts ${slug ? 'single' : 'all'}`}>
          {filteredBlogPosts.map((post: any) => (
            <li
              key={post.id}
              className={`blogpost post ${post.image_file?.data ? 'has-image' : 'has-no-image'}`}
            >
              <div className='image' onClick={() => gotoPost(post)}>
                {post.image_file?.data && (
                  <img src={post.image_file.data} alt={post.title} />
                )}
              </div>
              <div className='meta'>
                <h2 className='title' onClick={() => gotoPost(post)}>
                  {post.title}
                </h2>
                <div className='category' onClick={() => setFilter(setCategory, post.category)}>
                  {post.category}
                </div>
              </div>
              <div className='body' onClick={() => gotoPost(post)}>
                {slug ? post.body : processBody(post.body, post.slug)}
              </div>
              {slug && (
                <div className='back-to-blog' onClick={() => setSlug('')}>
                  <Link to='/blog'>
                    Back to Blog
                  </Link>
                </div>
              )}
              <div className='bottom-meta'>
                <div className='tags'>
                  {post.tags.split(',').map((tag: string, index: any) => (
                    <div key={index} className='tag' onClick={() => setFilter(setTag, tag)}>
                      #{tag}
                    </div>
                  ))}
                </div>
                <div className='date' onClick={() => gotoPost(post)}>
                  {processBlogDate(post.created_at)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p className='no-posts'>No blog posts found.</p>
          {slug && (
            <div className='back-to-blog-no-posts' onClick={() => setSlug('')}>
              <Link to='/blog'>
                Back to Blog
              </Link>
            </div>
          )}
        </>
      )}
      {(allTags.length > 0) && (allCategories.length > 0) && !slug && (
        <div className='tags-for-filter'>
          {allTags.length > 0 && allTags.map((tag: string, index: any) => (
            <div key={index} className='tag-for-filter filter-option' onClick={() => setFilter(setTag, tag)}>
              #{tag}
            </div>
          ))}
          {allCategories.length > 0 && allCategories.map((category: string, index: any) => (
            <div key={index} className='category-for-filter filter-option' onClick={() => setFilter(setCategory, category)}>
              {category}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}