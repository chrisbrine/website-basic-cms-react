import { createRef, useState } from 'react';
import { Form, Input, Button, Validate, TextArea, Select, FileInput } from '../../forms';
import '../resumes.css';
import { BlogStatus, IBlogPost, processSettings } from '../../../types';
import { useSelector } from 'react-redux';
import { getMainSettings } from '../../../store';

interface BlogPostProps {
  title?: string;
  buttonLabel?: string;
  description?: string;
  blogPost: IBlogPost;
  onChange?: (args: any) => void;
  onSave?: (WorkExperience: any) => void;
  onDelete?: (workExperience: any) => void;
  checkSlug?: (slug: string, id: number) => boolean;
}

export default function BlogPost({
  title = '',
  buttonLabel = 'Save Blog Post',
  description = '',
  blogPost,
  onChange,
  onSave,
  onDelete,
  checkSlug,
}: BlogPostProps) {
  const settings = useSelector(getMainSettings);
  const currentCategories = processSettings(settings).blog_categories;
  const categories = Object.fromEntries(currentCategories.map((category) => ([
    category, category,
  ])));
  const imageFileRef = createRef<any>();
  const titleRef = createRef<any>();
  const slugRef = createRef<any>();
  const bodyRef = createRef<any>();
  const categoryRef = createRef<any>();
  const tagsRef = createRef<any>();
  const statusRef = createRef<any>();
  const [imageFileState, setImageFileState] = useState<any>(blogPost?.image_file);
  const [titleState, setTitleState] = useState(blogPost?.title);
  const [slugState, setSlugState] = useState(blogPost?.slug);
  const [bodyState, setBodyState] = useState(blogPost?.body);
  const [categoryState, setCategoryState] = useState(blogPost?.category);
  const [tagsState, setTagsState] = useState(blogPost?.tags);
  const [statusState, setStatusState] = useState(blogPost?.status);
  const [slugExists, setSlugExists] = useState(false);
  const [,setSlugValid] = useState(true);
  const [disabled, setDisabled] = useState(true);
  // const editHistory = (blogPost?.edit_history ? blogPost.edit_history : []).push({
  //   ...blogPost,
  // } as IBlogPostHistory);

  if (!title) {
    if (blogPost.id) {
      title = `Blog Post #${blogPost.id}`;
    } else {
      title = 'Blog Post';
    }
  }

  const evaluateDisabled = (value: any, required: boolean = true, evaluator: boolean = true) => {
    setDisabled(
      (required ? !value : false) ||
      // !imageFileState ||
      !titleState ||
      !slugState ||
      !bodyState ||
      !statusState ||
      !evaluator
    );
  }

  const processChange = (setState: any, args: any, required: boolean = true) => {
    setState(args.value);
    onChange && onChange(args);
    evaluateDisabled(args.value, required);
  }

  const handleChange = (args: any) => {
    switch (args.field) {
      case 'image_file': {
        processChange(setImageFileState, args, false);
        break;
      }
      case 'title': {
        processChange(setTitleState, args);
        break;
      }
      case 'slug': {
        const goodSlug = checkSlug ? checkSlug(args.value, blogPost.id || 0) : true;
        setSlugExists(!goodSlug);
        processChange(setSlugState, args);
        if (!goodSlug) {
          setDisabled(true);
        }
        break;
      }
      case 'body': {
        processChange(setBodyState, args);
        break;
      }
      case 'category': {
        processChange(setCategoryState, args, false);
        break;
      }
      case 'tags': {
        processChange(setTagsState, args, false);
        break;
      }
      case 'status': {
        processChange(setStatusState, args);
        break;
      }
      default: {
        break;
      }
    }
  };

  const getProcessedState = () => {
    return {
      ...blogPost,
      image_file: imageFileState,
      title: titleState,
      slug: slugState,
      category: categoryState,
      tags: tagsState,
      status: statusState,
      body: bodyState,
    };
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(getProcessedState());
    } else {
      setImageFileState('');
      setTitleState('');
      setSlugState('');
      setBodyState('');
      setCategoryState('');
      setTagsState('');
      setStatusState(BlogStatus.DRAFT);
      setSlugExists(false);
      imageFileRef.current.state.value = '';
      titleRef.current.state.value = '';
      slugRef.current.state.value = '';
      bodyRef.current.state.value = '';
      categoryRef.current.state.value = '';
      tagsRef.current.state.value = '';
      statusRef.current.state.value = '';
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave(getProcessedState());
    }
  }

  const afterValidate = (field: string, pass: boolean) => {
    if (field === 'slug') {
      setSlugValid(pass);
      evaluateDisabled(slugState, true, pass);
    }
  }

  return (
    <Form className={`form`}>
      <Button
        className='delete-button'
        text='X'
        onClick={handleDelete}
      />
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <FileInput
        name="image_file"
        label="Blog Post Featured Image"
        types={["image"]}
        placeholder="Upload the featured image for the blog post"
        value={imageFileState ? imageFileState : ''}
        onChange={handleChange}
        validate={Validate.isImage}
      />
      <Input
        name='title'
        label='Blog Title'
        type='text'
        ref={titleRef}
        placeholder='Please enter the blog post title'
        value={titleState}
        required={true}
        emptyInvalid={true}
        onChange={handleChange}
        validate={Validate.notEmpty}
      />
      <Input
        name='slug'
        label='Slug'
        type='text'
        ref={slugRef}
        placeholder='Please enter the slug used in the url'
        value={slugState}
        required={true}
        emptyInvalid={true}
        onChange={handleChange}
        validate={Validate.isSlug}
        afterValidate={afterValidate}
        invalidMessage={'The slug must be lowercase and contain only letters, numbers, and dashes'}
      />
      <Select
        name='status'
        label='Status'
        placeholder='Please select the post status'
        value={statusState}
        options={{
          [BlogStatus.DRAFT]: 'DRAFT',
          [BlogStatus.PUBLISHED]: 'PUBLISHED',
        }}
        onChange={handleChange}
      />
      <Select
        name='category'
        label='Category'
        placeholder='Please select the post category'
        value={categoryState}
        options={categories}
        onChange={handleChange}
      />
      <Input
        name='tags'
        label='Tags'
        type='text'
        ref={tagsRef}
        placeholder='Please enter the tags for the post with a comma (,) between each tag'
        tooltip='Please enter the tags for the post with a comma (,) between each tag'
        value={tagsState}
        onChange={handleChange}
      />
      <TextArea
        name='body'
        label='Body'
        ref={bodyRef}
        rows={10}
        placeholder='Please enter the blog post body'
        required={true}
        emptyInvalid={true}
        value={bodyState}
        onChange={handleChange}
        validate={Validate.notEmpty}
      />
      {slugExists && (
        <div className='submit-error'>The provided slug already exists on another blog post</div>
      )}
      <Button
        type='submit'
        disabled={disabled}
        text={buttonLabel}
        onClick={handleSave}
      />
    </Form>
  );
}